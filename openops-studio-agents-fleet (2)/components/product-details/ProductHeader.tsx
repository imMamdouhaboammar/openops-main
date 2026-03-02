
// tag: don't regression this feature
import React from 'react';
import { AgentProduct } from '../../types';
import { Icons } from '../Icons';
import { useFavorites } from '../../hooks/useFavorites';
import { getScarcityData } from '../../lib/engine';

interface ProductHeaderProps {
  agent: AgentProduct;
  onBack: () => void;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({ agent, onBack }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(agent.id);
  const scarcity = getScarcityData(agent.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white mb-8 transition-colors group"
      >
        <div className="p-1 rounded-full bg-gray-100 dark:bg-dark-900 group-hover:bg-brand-500 group-hover:text-white transition-colors">
          <Icons.ChevronRight className="w-4 h-4 rotate-180" />
        </div>
        <span className="font-medium">Back to Fleet</span>
      </button>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-gray-100 dark:border-dark-900">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 dark:bg-dark-900 text-black dark:text-white border border-gray-200 dark:border-dark-800 uppercase tracking-wider">
              {agent.category}
            </span>
            
            {/* Scarcity Indicator - Header Version */}
            <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
              scarcity.isUrgent
                ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30 animate-pulse'
                : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30'
            }`}>
              {scarcity.isUrgent ? <Icons.TrendingUp className="w-3.5 h-3.5" /> : <Icons.Activity className="w-3.5 h-3.5" />}
              {scarcity.isUrgent 
                ? `Only ${scarcity.remaining} Left in Batch #${scarcity.batchNumber}` 
                : `Batch #${scarcity.batchNumber}: ${scarcity.sold}/${scarcity.total} Claimed`
              }
            </span>

            <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
              <Icons.Shield className="w-3 h-3" /> Verified Source
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-3 tracking-tighter leading-none">
            {agent.name}
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-500 font-mono">
              {agent.role}
            </p>
            <div className="flex items-center gap-1 text-yellow-400">
              <Icons.Star className="w-5 h-5 fill-current" />
              <span className="text-lg font-bold text-black dark:text-white">{agent.rating}</span>
              <span className="text-sm text-gray-400 font-normal">({agent.ratingCount} reviews)</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={(e) => toggleFavorite(e, agent.id)}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl border transition-colors group ${
              favorited
                ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/50'
                : 'bg-gray-50 dark:bg-dark-900 border-gray-100 dark:border-dark-800 hover:border-brand-500/50'
            }`}
            title={favorited ? "Remove from Favorites" : "Add to Favorites"}
          >
            <Icons.Heart className={`w-6 h-6 transition-colors ${
              favorited 
                ? 'text-red-500 fill-current' 
                : 'text-gray-400 group-hover:text-red-500'
            }`} />
          </button>

          {agent.compatiblePlatforms.map(platform => (
             <div key={platform} className="flex flex-col items-center justify-center w-14 h-14 bg-gray-50 dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-800 transition-colors hover:border-brand-500/50 group" title={platform}>
                {platform === 'Gemini' && <Icons.Gemini className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />}
                {platform === 'ChatGPT' && <Icons.ChatGPT className="w-6 h-6 text-gray-400 group-hover:text-green-500 transition-colors" />}
                {platform === 'Claude' && <Icons.Claude className="w-6 h-6 text-gray-400 group-hover:text-orange-500 transition-colors" />}
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};
