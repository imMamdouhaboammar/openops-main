// tag: don't regression this feature
import React from 'react';
import { AgentProduct } from '../../types';
import { Icons } from '../Icons';

interface WishlistItemProps {
  agent: AgentProduct;
  onRemove: (id: string) => void;
  onAddToCart: (agent: AgentProduct) => void;
  onView: (agent: AgentProduct) => void;
}

export const WishlistItem: React.FC<WishlistItemProps> = ({ agent, onRemove, onAddToCart, onView }) => {
  return (
    <div 
      className="group relative bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl p-4 transition-all hover:border-brand-500/30 hover:shadow-lg dark:hover:shadow-none flex flex-col sm:flex-row gap-4"
    >
      {/* Icon/Image Area */}
      <div 
        onClick={() => onView(agent)}
        className="w-full sm:w-20 h-20 bg-gray-50 dark:bg-dark-800 rounded-lg flex items-center justify-center shrink-0 cursor-pointer border border-gray-100 dark:border-dark-700"
      >
        <Icons.Terminal className="w-8 h-8 text-gray-400 dark:text-gray-500 group-hover:text-brand-500 transition-colors" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h4 
              onClick={() => onView(agent)}
              className="font-bold text-slate-900 dark:text-white hover:text-brand-500 cursor-pointer truncate pr-4"
            >
              {agent.name}
            </h4>
            <p className="text-xs text-gray-500 font-mono mt-0.5">{agent.role}</p>
          </div>
          <button 
            onClick={() => onRemove(agent.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            title="Remove from Wishlist"
          >
            <Icons.X className="w-4 h-4" />
          </button>
        </div>

        {/* Specs / Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
             <Icons.Cpu className="w-3 h-3" />
             {agent.compatiblePlatforms[0]}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
             <Icons.Star className="w-3 h-3" />
             {agent.rating}
          </span>
        </div>

        {/* Footer / Price / Action */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-dark-800">
          <div className="font-mono font-bold text-lg text-slate-900 dark:text-white">
            ${agent.price}
          </div>
          <button 
            onClick={() => onAddToCart(agent)}
            className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold hover:bg-brand-600 dark:hover:bg-brand-500 dark:hover:text-white transition-all shadow-sm"
          >
            <Icons.ShoppingCart className="w-3 h-3" />
            Move to Cart
          </button>
        </div>
      </div>
    </div>
  );
};