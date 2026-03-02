
// tag: don't regression this feature
import React from 'react';
import { AgentProduct } from '../../types';
import { Icons } from '../Icons';

interface StickyHeaderProps {
  agent: AgentProduct;
  isVisible: boolean;
  onAddToCart: (agent: AgentProduct) => void;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({ agent, isVisible, onAddToCart }) => {
  // Desktop only (hidden on mobile, md:block) because mobile has StickyBuyBar at bottom
  // Translates down to appear below the fixed Navbar (approx 80px / 5rem on desktop)
  return (
    <div 
      className={`fixed top-0 left-0 w-full z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-dark-800 transition-transform duration-300 ease-in-out hidden md:block ${
        isVisible ? 'translate-y-20' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 flex items-center justify-center">
              <Icons.Terminal className="w-5 h-5 text-gray-500" />
           </div>
           <div>
             <h3 className="font-bold text-black dark:text-white text-base leading-tight">{agent.name}</h3>
             <p className="text-xs text-gray-500 dark:text-gray-400">{agent.role}</p>
           </div>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="text-right">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Price</p>
              <p className="font-mono font-bold text-lg text-black dark:text-white">${agent.price}</p>
           </div>
           <button 
             onClick={() => onAddToCart(agent)}
             className="px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2 transform active:scale-95"
           >
             <Icons.ShoppingCart className="w-4 h-4" />
             <span>Add to Cart</span>
           </button>
        </div>
      </div>
    </div>
  );
};
