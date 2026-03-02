// tag: don't regression this feature
import React, { useState, useMemo } from 'react';
import { Icons } from '../Icons';
import { AgentProduct } from '../../types';
import { WishlistItem } from './WishlistItem';
import { ComparisonView } from './ComparisonView';
import { agents as allAgents } from '../../data';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemoveFromWishlist: (id: string) => void;
  onAddToCart: (agent: AgentProduct) => void;
  onViewProduct: (agent: AgentProduct) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ 
  isOpen, 
  onClose, 
  wishlistIds, 
  onRemoveFromWishlist,
  onAddToCart,
  onViewProduct
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'compare'>('list');

  // Resolve IDs to full agent objects
  const wishlistAgents = useMemo(() => {
    return allAgents.filter(a => wishlistIds.includes(a.id));
  }, [wishlistIds]);

  const handleMoveAllToCart = () => {
    wishlistAgents.forEach(agent => onAddToCart(agent));
    // Optional: Clear wishlist after moving? 
    // For premium UX, we usually keep them in wishlist until purchased, or let user decide.
    // Here we just add to cart.
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-[60] overflow-hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div 
        className={`absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose} 
      />
      
      <div className={`
        fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-dark-950 border-l border-gray-200 dark:border-dark-800 shadow-2xl 
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-dark-800 flex justify-between items-center bg-white/50 dark:bg-dark-900/50 backdrop-blur-md">
          <div className="flex items-center gap-2">
             <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-full text-red-500">
               <Icons.Heart className="w-5 h-5 fill-current" />
             </div>
             <div>
               <h2 className="text-lg font-black text-slate-900 dark:text-white leading-none">Command Deck</h2>
               <p className="text-xs text-gray-500 mt-1">{wishlistAgents.length} Agents Saved</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-full transition-colors">
            <Icons.X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        {wishlistAgents.length > 0 && (
          <div className="px-6 pt-4 pb-0 flex gap-6 border-b border-gray-100 dark:border-dark-800">
            <button 
              onClick={() => setActiveTab('list')}
              className={`pb-3 text-sm font-bold transition-all border-b-2 ${activeTab === 'list' ? 'border-brand-500 text-brand-600 dark:text-brand-400' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              List View
            </button>
            <button 
              onClick={() => setActiveTab('compare')}
              className={`pb-3 text-sm font-bold transition-all border-b-2 ${activeTab === 'compare' ? 'border-brand-500 text-brand-600 dark:text-brand-400' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              Compare Specs
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-gray-50/50 dark:bg-black/20">
          {wishlistAgents.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60">
              <div className="w-20 h-20 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center mb-4">
                <Icons.Heart className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Deck is Empty</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-[200px]">
                Start scouting agents to build your automation fleet.
              </p>
              <button 
                onClick={onClose}
                className="mt-6 text-brand-500 font-bold text-sm hover:underline"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <>
              {activeTab === 'list' ? (
                <div className="space-y-4">
                  {wishlistAgents.map(agent => (
                    <WishlistItem 
                      key={agent.id}
                      agent={agent}
                      onRemove={onRemoveFromWishlist}
                      onAddToCart={onAddToCart}
                      onView={(a) => { onClose(); onViewProduct(a); }}
                    />
                  ))}
                </div>
              ) : (
                <ComparisonView agents={wishlistAgents} onAddToCart={onAddToCart} />
              )}
            </>
          )}
        </div>

        {/* Footer Actions */}
        {wishlistAgents.length > 0 && (
          <div className="p-6 border-t border-gray-100 dark:border-dark-800 bg-white dark:bg-dark-900 shrink-0">
             {activeTab === 'compare' && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-lg flex gap-3 items-start">
                   <Icons.ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                   <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                     <strong>Pro Tip:</strong> Compare "Plug & Play" vs "Advanced" setups to ensure your team can handle the deployment complexity.
                   </p>
                </div>
             )}
             <button 
               onClick={handleMoveAllToCart}
               className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-200 dark:shadow-brand-900/20 transition-all flex items-center justify-center gap-2"
             >
               <Icons.Layers className="w-5 h-5" />
               Move All {wishlistAgents.length} to Cart
             </button>
          </div>
        )}

      </div>
    </div>
  );
};