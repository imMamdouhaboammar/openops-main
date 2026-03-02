
import React from 'react';
import { AgentProduct, AgentCategory } from '../../types';
import { Icons } from '../Icons';

interface ProductSidebarProps {
  agent: AgentProduct;
  onAddToCart: (agent: AgentProduct) => void;
}

export const ProductSidebar: React.FC<ProductSidebarProps> = ({ agent, onAddToCart }) => {
  
  // Local logic to determine bonuses for this specific product
  const getProductBonuses = () => {
    const bonuses = [];
    
    // Engineering Bonus
    if (agent.category === AgentCategory.ENGINEERING) {
      bonuses.push({
        name: 'OpenOps CI/CD Pipeline',
        icon: Icons.Workflow,
        desc: 'Automated GitHub Actions workflow.'
      });
    }

    // Strategic Bonus
    if (agent.category === AgentCategory.STRATEGIC) {
      bonuses.push({
        name: 'AI Governance Handbook',
        icon: Icons.Scroll,
        desc: 'SOPs for human-agent collaboration.'
      });
    }

    // Operations Bonus
    if (agent.category === AgentCategory.OPERATIONS) {
      bonuses.push({
        name: 'Auto-Compliance Script',
        icon: Icons.ShieldCheck,
        desc: 'Python script for output validation.'
      });
    }

    // Universal Adapter (If multi-platform)
    if (agent.compatiblePlatforms.length > 1) {
      bonuses.push({
        name: 'Universal Deployment CLI',
        icon: Icons.Box,
        desc: 'Unified CLI for multi-platform deploy.'
      });
    }

    return bonuses;
  };

  const bonuses = getProductBonuses();

  return (
    <div className="sticky top-24 space-y-6">
      
      {/* Pricing Card */}
      <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-dark-800 p-8">
        <div className="mb-2">
          <span className="text-6xl font-black text-black dark:text-white tracking-tighter">${agent.price}</span>
          <span className="text-gray-400 dark:text-gray-600 text-xl font-medium ml-2">USD</span>
        </div>
        <div className="mb-8 text-xs text-gray-500 font-mono">One-time purchase • Source Code included</div>

        <button 
          onClick={() => onAddToCart(agent)}
          className="w-full py-5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xl rounded-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl shadow-brand-500/20"
        >
          Add to Cart
          <Icons.ShoppingCart className="w-6 h-6" />
        </button>
        
        <div className="mt-8 space-y-4 pt-8 border-t border-gray-100 dark:border-dark-800">
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <Icons.Check className="w-5 h-5 text-green-500" />
            <span>Commercial License</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
             <Icons.Check className="w-5 h-5 text-green-500" />
             <span>Lifetime Updates</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
             <Icons.Check className="w-5 h-5 text-green-500" />
             <span>Discord Support Access</span>
          </div>
        </div>
      </div>

      {/* Bonus Infrastructure Section */}
      {bonuses.length > 0 && (
        <div className="bg-slate-900 dark:bg-brand-900/10 rounded-2xl border border-slate-800 dark:border-brand-500/20 p-6">
           <div className="flex items-center gap-2 mb-4 text-white dark:text-brand-400">
              <Icons.Wrench className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-widest">Included Infrastructure</h4>
           </div>
           <div className="space-y-4">
             {bonuses.map((bonus, idx) => (
               <div key={idx} className="flex gap-3">
                 <div className="w-8 h-8 rounded bg-slate-800 dark:bg-dark-900 flex items-center justify-center shrink-0 border border-slate-700 dark:border-dark-700">
                   <bonus.icon className="w-4 h-4 text-gray-300 dark:text-brand-500" />
                 </div>
                 <div>
                   <div className="text-sm font-bold text-white dark:text-gray-200">{bonus.name}</div>
                   <div className="text-xs text-gray-400 dark:text-gray-500 leading-tight mt-0.5">{bonus.desc}</div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      )}

      {/* Vendor Info */}
      <div className="bg-gray-50 dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 p-6">
         <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold">
              {agent.vendor.name.charAt(0)}
            </div>
            <div>
               <div className="font-bold text-sm text-black dark:text-white flex items-center gap-1">
                 {agent.vendor.name}
                 {agent.vendor.verified && <Icons.Check className="w-3 h-3 text-blue-500" />}
               </div>
               <div className="text-xs text-gray-500">Verified Vendor</div>
            </div>
         </div>
         <div className="flex items-center gap-2 text-xs text-gray-500">
            <Icons.Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>{agent.vendor.rating} Vendor Rating</span>
         </div>
      </div>

    </div>
  );
};
