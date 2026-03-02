
import React from 'react';
import { AgentProduct } from '../../types';
import { AgentCard } from '../AgentCard';

interface RelatedProductsProps {
  agents: AgentProduct[];
  onView: (agent: AgentProduct) => void;
  onAddToCart: (agent: AgentProduct) => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ agents, onView, onAddToCart }) => {
  if (agents.length === 0) return null;

  return (
    <div className="mt-24 border-t border-gray-100 dark:border-dark-900 pt-16">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-8">You Might Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {agents.map(similar => (
          <div key={similar.id} className="h-full">
            <AgentCard 
              agent={similar} 
              onView={onView} 
              onAddToCart={onAddToCart} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};
