
import React from 'react';
import { AgentProduct } from '../../types';

interface StickyBuyBarProps {
  agent: AgentProduct;
  isVisible: boolean;
  onAddToCart: (agent: AgentProduct) => void;
}

export const StickyBuyBar: React.FC<StickyBuyBarProps> = ({ agent, isVisible, onAddToCart }) => {
  return (
    <div className={`fixed bottom-0 left-0 w-full bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-800 p-4 z-40 transform transition-transform md:hidden ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Total Price</p>
          <p className="text-xl font-bold text-black dark:text-white">${agent.price}</p>
        </div>
        <button 
          onClick={() => onAddToCart(agent)}
          className="px-6 py-3 bg-brand-500 text-white font-bold rounded-xl shadow-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
