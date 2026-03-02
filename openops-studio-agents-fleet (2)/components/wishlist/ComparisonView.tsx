// tag: don't regression this feature
import React from 'react';
import { AgentProduct } from '../../types';
import { Icons } from '../Icons';

interface ComparisonViewProps {
  agents: AgentProduct[];
  onAddToCart: (agent: AgentProduct) => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ agents, onAddToCart }) => {
  if (agents.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-6 border-2 border-dashed border-gray-200 dark:border-dark-800 rounded-xl">
        <Icons.GitMerge className="w-12 h-12 text-gray-300 dark:text-dark-700 mb-4" />
        <p className="text-gray-500 font-medium">Add at least 2 agents to the Command Deck to compare specifications.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto pb-4 scrollbar-hide">
      <div className="min-w-max">
        <div className="grid gap-4" style={{ gridTemplateColumns: `100px repeat(${agents.length}, 180px)` }}>
          
          {/* Header Row: Names */}
          <div className="flex flex-col justify-end pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
            Spec
          </div>
          {agents.map(agent => (
            <div key={agent.id} className="pb-4">
              <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-dark-800 flex items-center justify-center mb-3">
                <Icons.Terminal className="w-6 h-6 text-gray-500" />
              </div>
              <div className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 h-10 leading-tight">
                {agent.name}
              </div>
            </div>
          ))}

          {/* Price Row */}
          <div className="py-3 border-t border-gray-100 dark:border-dark-800 text-xs font-medium text-gray-500">
            Investment
          </div>
          {agents.map(agent => (
            <div key={agent.id} className="py-3 border-t border-gray-100 dark:border-dark-800 font-mono font-bold text-brand-600 dark:text-brand-400">
              ${agent.price}
            </div>
          ))}

          {/* Setup Difficulty (Simulated Logic based on category) */}
          <div className="py-3 border-t border-gray-100 dark:border-dark-800 text-xs font-medium text-gray-500">
            Setup Level
          </div>
          {agents.map(agent => {
            const isComplex = agent.category === 'Engineering' || agent.category === 'Operations';
            return (
              <div key={agent.id} className="py-3 border-t border-gray-100 dark:border-dark-800">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  isComplex 
                  ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' 
                  : 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                }`}>
                  {isComplex ? 'Advanced' : 'Plug & Play'}
                </span>
              </div>
            );
          })}

          {/* Primary Platform */}
          <div className="py-3 border-t border-gray-100 dark:border-dark-800 text-xs font-medium text-gray-500">
            Runtime
          </div>
          {agents.map(agent => (
            <div key={agent.id} className="py-3 border-t border-gray-100 dark:border-dark-800 flex flex-wrap gap-1">
               {agent.compatiblePlatforms.map(p => (
                 <span key={p} className="text-[10px] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-dark-700 px-1 rounded">
                   {p}
                 </span>
               ))}
            </div>
          ))}

          {/* Files Included Count */}
          <div className="py-3 border-t border-gray-100 dark:border-dark-800 text-xs font-medium text-gray-500">
            Source Files
          </div>
          {agents.map(agent => (
            <div key={agent.id} className="py-3 border-t border-gray-100 dark:border-dark-800 text-xs text-gray-600 dark:text-gray-400">
              {agent.filesIncluded.length} Modules
            </div>
          ))}

          {/* Action Row */}
          <div className="pt-4 border-t border-gray-100 dark:border-dark-800"></div>
          {agents.map(agent => (
            <div key={agent.id} className="pt-4 border-t border-gray-100 dark:border-dark-800">
              <button 
                onClick={() => onAddToCart(agent)}
                className="w-full py-2 bg-brand-50 dark:bg-brand-900/10 text-brand-600 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-900/30 rounded-lg text-xs font-bold transition-colors"
              >
                Add
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};