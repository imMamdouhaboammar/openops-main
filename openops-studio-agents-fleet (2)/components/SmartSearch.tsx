
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icons';
import { api } from '../lib/api';
import { AgentProduct } from '../types';

interface SmartSearchProps {
  onSearchSubmit: (query: string) => void;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({ onSearchSubmit }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AgentProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        // Cast result to AgentProduct[] because we updated api.ts to return full objects
        const data = await api.search(query) as unknown as AgentProduct[];
        setResults(data);
        setIsLoading(false);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard shortcut Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0) {
        onSearchSubmit(results[selectedIndex].name); // Usually navigate to product
        setIsOpen(false);
      } else {
        onSearchSubmit(query);
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full z-30">
      <div className="relative group">
        <input 
          ref={inputRef}
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="Search agents... (Press ⌘K)" 
          aria-label="Search agents"
          className="w-full bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl py-3.5 pl-12 pr-4 text-black dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-gray-400 shadow-sm"
        />
        <Icons.Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
        
        {isLoading && (
          <div className="absolute right-4 top-3.5 animate-spin">
            <Icons.Zap className="w-5 h-5 text-brand-500" />
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-900 border border-gray-100 dark:border-dark-800 rounded-xl shadow-2xl overflow-hidden animate-fade-in-up" role="listbox">
          {results.length > 0 ? (
            <ul>
              {results.map((result, idx) => (
                <li 
                  key={result.id}
                  onClick={() => {
                    onSearchSubmit(result.name);
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-4 py-3 cursor-pointer flex justify-between items-start transition-colors ${
                    idx === selectedIndex ? 'bg-brand-50 dark:bg-brand-900/20' : 'hover:bg-gray-50 dark:hover:bg-dark-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-gray-100 dark:bg-dark-800 flex items-center justify-center shrink-0">
                      <Icons.Terminal className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-black dark:text-white leading-tight">{result.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          {result.vendor.name}
                          {result.vendor.verified && <Icons.Check className="w-3 h-3 text-blue-500" />}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-medium text-brand-600 dark:text-brand-500">
                      ${result.price}
                    </div>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <Icons.Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-500">{result.rating}</span>
                    </div>
                  </div>
                </li>
              ))}
              <li 
                className="px-4 py-3 bg-gray-50 dark:bg-dark-950 border-t border-gray-100 dark:border-dark-800 text-center text-xs text-gray-500 cursor-pointer hover:text-brand-500 transition-colors"
                onClick={() => {
                  onSearchSubmit(query);
                  setIsOpen(false);
                }}
              >
                View all results for "{query}"
              </li>
            </ul>
          ) : (
            !isLoading && (
              <div className="p-8 text-center text-gray-500">
                <p>No agents found matching "{query}"</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
