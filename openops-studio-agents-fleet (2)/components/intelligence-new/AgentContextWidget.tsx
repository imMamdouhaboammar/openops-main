
// tag: don't regression this feature
import React from 'react';
import { AgentProduct } from '../../types';
import { Icons } from '../Icons';
import { agents } from '../../data';

interface AgentContextWidgetProps {
  relatedIds?: string[];
  onViewProduct: (agent: AgentProduct) => void;
}

export const AgentContextWidget: React.FC<AgentContextWidgetProps> = ({ relatedIds, onViewProduct }) => {
  // If no related IDs, show trending agents
  const displayAgents = relatedIds 
    ? agents.filter(a => relatedIds.includes(a.id))
    : agents.filter(a => a.isTrending).slice(0, 2);

  if (displayAgents.length === 0) return null;

  return (
    <div className="bg-brand-50/50 dark:bg-dark-900 border border-brand-100 dark:border-dark-800 rounded-2xl p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-4 text-brand-700 dark:text-brand-400">
         <Icons.Zap className="w-4 h-4 fill-current" />
         <h3 className="text-xs font-black uppercase tracking-widest">Deploy This Intelligence</h3>
      </div>
      <p className="text-xs text-gray-500 mb-6 leading-relaxed">
        Don't just read about it. The agents mentioned in this article are available for immediate acquisition.
      </p>

      <div className="space-y-3">
        {displayAgents.map(agent => (
          <div 
            key={agent.id}
            onClick={() => onViewProduct(agent)}
            className="group bg-white dark:bg-black border border-gray-200 dark:border-dark-800 hover:border-brand-500 dark:hover:border-brand-500 p-3 rounded-xl cursor-pointer transition-all shadow-sm hover:shadow-md"
          >
             <div className="flex justify-between items-start mb-2">
                <div className="p-1.5 rounded bg-gray-100 dark:bg-dark-800 text-gray-500">
                   <Icons.Terminal className="w-3 h-3" />
                </div>
                <span className="text-xs font-mono font-bold text-black dark:text-white">${agent.price}</span>
             </div>
             <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-500 transition-colors">
               {agent.name}
             </h4>
             <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-400">
                <Icons.Download className="w-3 h-3" />
                <span>Source Code Included</span>
             </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-xs font-bold text-center text-brand-600 dark:text-brand-500 hover:underline">
        Browse Full Fleet
      </button>
    </div>
  );
};
