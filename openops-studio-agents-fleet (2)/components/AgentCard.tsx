
import React, { useState } from 'react';
import { Icons } from './Icons';
import { AgentProduct } from '../types';
import { useFavorites } from '../hooks/useFavorites';
import { ShareModal } from './ShareModal';
import { getScarcityData } from '../lib/engine';

interface AgentCardProps {
  agent: AgentProduct;
  onView: (agent: AgentProduct) => void;
  onAddToCart: (agent: AgentProduct) => void;
  onCompare?: (agent: AgentProduct) => void;
  isComparing?: boolean;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onView, onAddToCart, onCompare, isComparing }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const favorited = isFavorite(agent.id);
  
  // Scarcity Logic
  const scarcity = getScarcityData(agent.id);

  return (
    <>
      <div 
        onClick={() => onView(agent)}
        className={`
          group relative bg-white dark:bg-dark-900 border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-full cursor-pointer
          ${isComparing 
            ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-xl' 
            : 'border-gray-100 dark:border-dark-800 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-brand-900/10'}
        `}
      >
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          {/* Compare Toggle */}
          {onCompare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCompare(agent);
              }}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 border ${
                isComparing
                  ? 'bg-brand-500 text-white border-brand-500'
                  : 'bg-white/80 dark:bg-black/50 text-gray-400 border-transparent hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-black/80'
              }`}
              title="Compare"
            >
              <Icons.GitMerge className={`w-4 h-4 ${isComparing ? 'rotate-90' : ''}`} />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsShareOpen(true);
            }}
            className="p-2 rounded-full bg-white/80 dark:bg-black/50 text-gray-400 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-black/80 backdrop-blur-sm transition-all duration-300"
            title="Share"
          >
            <Icons.Share2 className="w-4 h-4" />
          </button>
          
          <button
            onClick={(e) => toggleFavorite(e, agent.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              favorited 
                ? 'bg-red-50 dark:bg-red-900/20 text-red-500' 
                : 'bg-white/80 dark:bg-black/50 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
            }`}
            title={favorited ? "Remove from Favorites" : "Add to Favorites"}
          >
            <Icons.Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-100 dark:border-dark-800 group-hover:bg-brand-50 dark:group-hover:bg-brand-500/10 group-hover:border-brand-200 dark:group-hover:border-brand-500/20 transition-colors">
              {agent.category === 'Strategic' && <Icons.Briefcase className="w-6 h-6 text-black dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-500" />}
              {agent.category === 'Engineering' && <Icons.Code className="w-6 h-6 text-black dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-500" />}
              {agent.category === 'Creative' && <Icons.MessageSquare className="w-6 h-6 text-black dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-500" />}
              {agent.category.includes('Regional') && <Icons.Globe className="w-6 h-6 text-black dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-500" />}
              {agent.category === 'Operations' && <Icons.Shield className="w-6 h-6 text-black dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-500" />}
              {agent.category === 'Fleet Bundle' && <Icons.Layers className="w-6 h-6 text-black dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-500" />}
            </div>
            {/* Scarcity Badge on Card */}
            <div className={`flex flex-col text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded border ${
              scarcity.isUrgent 
              ? 'bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30' 
              : 'bg-gray-100 dark:bg-dark-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-dark-700'
            }`}>
              <span>Batch #{scarcity.batchNumber}</span>
              <span className={scarcity.isUrgent ? 'animate-pulse' : ''}>
                {scarcity.sold}/{scarcity.total} Sold
              </span>
            </div>
          </div>
          
          <div className="mb-2">
            <h3 className="text-xl font-bold text-black dark:text-white leading-tight group-hover:text-brand-500 transition-colors">{agent.name}</h3>
            <div className="flex items-center gap-2 mt-2">
               <div className="flex items-center text-yellow-400">
                 <Icons.Star className="w-3.5 h-3.5 fill-current" />
               </div>
               <span className="text-xs font-bold text-black dark:text-white">{agent.rating}</span>
               <span className="text-xs text-gray-400">({agent.ratingCount})</span>
            </div>
          </div>

          <p className="text-brand-500 font-mono text-xs uppercase tracking-wider mb-4">{agent.role}</p>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
            {agent.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {agent.compatiblePlatforms.map(p => {
               const Icon = p === 'ChatGPT' ? Icons.ChatGPT : p === 'Claude' ? Icons.Claude : Icons.Gemini;
               return (
                <span key={p} className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 dark:bg-dark-950 rounded text-[10px] font-medium text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-dark-800">
                  <Icon className={`w-3 h-3 ${p === 'ChatGPT' ? 'text-green-600' : p === 'Claude' ? 'text-orange-600' : 'text-blue-600'}`} />
                  {p}
                </span>
               )
            })}
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 dark:border-dark-800 pt-5 mt-auto">
            <div>
              <div className="font-mono text-xl font-bold text-black dark:text-white">${agent.price}</div>
              {scarcity.isUrgent && (
                <div className="text-[10px] text-red-500 font-bold">Price increase soon</div>
              )}
            </div>
            <div className="flex gap-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(agent);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white hover:bg-brand-500 dark:hover:bg-brand-500 text-white dark:text-black dark:hover:text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-gray-200 dark:shadow-none active:scale-95"
              >
                <Icons.ShoppingCart className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <ShareModal 
        agent={agent} 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
      />
    </>
  );
};