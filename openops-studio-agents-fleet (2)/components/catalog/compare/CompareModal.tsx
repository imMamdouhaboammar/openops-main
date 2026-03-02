
// tag: don't regression this feature
import React from 'react';
import { AgentProduct } from '../../../types';
import { Icons } from '../../Icons';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  agents: AgentProduct[];
  onAddToCart: (agent: AgentProduct) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose, agents, onAddToCart }) => {
  if (!isOpen) return null;

  const featuresList = Array.from(new Set(agents.flatMap(a => a.features)));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white dark:bg-dark-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up border border-gray-200 dark:border-dark-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-100 dark:border-dark-800 bg-gray-50/50 dark:bg-dark-950/50">
          <div>
             <h2 className="text-2xl font-black text-black dark:text-white">Agent Comparison</h2>
             <p className="text-sm text-gray-500">Analyzing {agents.length} vectors for optimal deployment.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-800 transition-colors">
            <Icons.X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="grid" style={{ gridTemplateColumns: `150px repeat(${agents.length}, minmax(0, 1fr))` }}>
            
            {/* 1. Header Row (Sticky possibility later) */}
            <div className="font-bold text-gray-400 text-xs uppercase tracking-wider py-4">Identity</div>
            {agents.map(agent => (
              <div key={agent.id} className="px-6 py-4">
                <div className="w-12 h-12 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xl mb-4">
                  {agent.name.charAt(0)}
                </div>
                <h3 className="font-bold text-lg text-black dark:text-white leading-tight mb-1">{agent.name}</h3>
                <p className="text-xs text-brand-600 dark:text-brand-500 font-mono uppercase">{agent.role}</p>
              </div>
            ))}

            {/* 2. Price Row */}
            <div className="font-bold text-gray-400 text-xs uppercase tracking-wider py-6 border-t border-gray-100 dark:border-dark-800">Investment</div>
            {agents.map(agent => (
              <div key={agent.id} className="px-6 py-6 border-t border-gray-100 dark:border-dark-800">
                <div className="font-mono text-2xl font-black text-black dark:text-white">${agent.price}</div>
                <div className="text-xs text-gray-500">{agent.licenseTier} License</div>
              </div>
            ))}

            {/* 3. Rating Row */}
            <div className="font-bold text-gray-400 text-xs uppercase tracking-wider py-6 border-t border-gray-100 dark:border-dark-800">Performance</div>
            {agents.map(agent => (
              <div key={agent.id} className="px-6 py-6 border-t border-gray-100 dark:border-dark-800">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="font-bold text-lg text-black dark:text-white">{agent.rating}</span>
                  <Icons.Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                <div className="text-xs text-gray-500">{agent.downloads} deployments</div>
              </div>
            ))}

            {/* 4. Platforms Row */}
            <div className="font-bold text-gray-400 text-xs uppercase tracking-wider py-6 border-t border-gray-100 dark:border-dark-800">Runtime</div>
            {agents.map(agent => (
              <div key={agent.id} className="px-6 py-6 border-t border-gray-100 dark:border-dark-800">
                <div className="flex flex-wrap gap-2">
                  {agent.compatiblePlatforms.map(p => (
                    <span key={p} className="px-2 py-1 bg-gray-100 dark:bg-dark-800 rounded text-xs font-bold text-gray-600 dark:text-gray-300">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* 5. Features Matrix */}
            <div className="font-bold text-gray-400 text-xs uppercase tracking-wider py-6 border-t border-gray-100 dark:border-dark-800">Capabilities</div>
            {agents.map(agent => (
              <div key={agent.id} className="px-6 py-6 border-t border-gray-100 dark:border-dark-800 space-y-3">
                {agent.features.map(feat => (
                  <div key={feat} className="flex items-start gap-2">
                    <Icons.Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{feat}</span>
                  </div>
                ))}
              </div>
            ))}

             {/* 6. File Contents */}
            <div className="font-bold text-gray-400 text-xs uppercase tracking-wider py-6 border-t border-gray-100 dark:border-dark-800">Source Code</div>
            {agents.map(agent => (
              <div key={agent.id} className="px-6 py-6 border-t border-gray-100 dark:border-dark-800">
                 <div className="text-xs font-mono text-gray-500">
                    {agent.filesIncluded.length} Files Included
                 </div>
                 <div className="mt-2 flex flex-wrap gap-1">
                    {agent.filesIncluded.map((f, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded text-[10px] text-gray-400 uppercase">
                        {f.type}
                      </span>
                    ))}
                 </div>
              </div>
            ))}

            {/* 7. Action Row */}
            <div className="py-6 border-t border-gray-100 dark:border-dark-800"></div>
            {agents.map(agent => (
              <div key={agent.id} className="px-6 py-6 border-t border-gray-100 dark:border-dark-800">
                <button 
                  onClick={() => onAddToCart(agent)}
                  className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-200 dark:shadow-brand-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Icons.ShoppingCart className="w-4 h-4" />
                  Add
                </button>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};