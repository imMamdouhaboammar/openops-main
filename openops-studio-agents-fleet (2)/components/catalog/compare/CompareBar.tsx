
// tag: don't regression this feature
import React from 'react';
import { Icons } from '../../Icons';
import { AgentProduct } from '../../../types';

interface CompareBarProps {
  selectedAgents: AgentProduct[];
  onClear: () => void;
  onCompare: () => void;
  onRemove: (id: string) => void;
}

export const CompareBar: React.FC<CompareBarProps> = ({ selectedAgents, onClear, onCompare, onRemove }) => {
  if (selectedAgents.length === 0) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up w-[90%] max-w-2xl">
      <div className="bg-slate-900 dark:bg-white text-white dark:text-black rounded-full shadow-2xl p-2 pl-6 flex items-center justify-between border border-slate-800 dark:border-slate-200">
        <div className="flex items-center gap-4">
          <span className="font-bold text-sm whitespace-nowrap">
            {selectedAgents.length} Selected
          </span>
          <div className="h-6 w-px bg-white/20 dark:bg-black/20"></div>
          <div className="flex -space-x-2">
            {selectedAgents.map(agent => (
              <div key={agent.id} className="relative group">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-black border-2 border-slate-900 dark:border-white flex items-center justify-center font-bold text-[10px] text-slate-900 dark:text-white cursor-help">
                  {agent.name.charAt(0)}
                </div>
                <button 
                  onClick={() => onRemove(agent.id)}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Icons.X className="w-2 h-2" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onClear}
            className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white dark:hover:text-black transition-colors"
          >
            Clear
          </button>
          <button 
            onClick={onCompare}
            disabled={selectedAgents.length < 2}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all
              ${selectedAgents.length >= 2 
                ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/30' 
                : 'bg-gray-800 dark:bg-gray-100 text-gray-500 dark:text-gray-400 cursor-not-allowed'}
            `}
          >
            Compare <Icons.GitMerge className="w-4 h-4 rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
};