
import React, { useEffect, useState } from 'react';
import { AgentProduct } from '../types';
import { Icons } from './Icons';

interface AgentDetailModalProps {
  agent: AgentProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (agent: AgentProduct) => void;
}

export const AgentDetailModal: React.FC<AgentDetailModalProps> = ({ agent, isOpen, onClose, onAddToCart }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowContent(true), 50);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  if (!isOpen || !agent) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />

      {/* Modal / Bottom Sheet Panel */}
      <div 
        className={`
          relative w-full max-w-4xl bg-white dark:bg-dark-900 
          rounded-t-2xl sm:rounded-2xl 
          shadow-2xl shadow-slate-900/20 dark:shadow-black border border-slate-200 dark:border-dark-700
          overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh]
          transform transition-all duration-300 ease-out
          ${showContent ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full sm:translate-y-10 sm:scale-95 opacity-0'}
        `}
      >
        
        {/* Mobile Drag Handle (Visual only) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1 bg-slate-50 dark:bg-dark-800 border-b border-transparent">
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full" />
        </div>

        <div className="absolute top-4 right-4 z-10 hidden sm:block">
          <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-dark-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar flex-1">
          <div className="grid grid-cols-1 md:grid-cols-5 min-h-full">
            
            {/* Left Column: Visual & Pricing */}
            <div className="md:col-span-2 bg-slate-50 dark:bg-dark-800 p-6 sm:p-8 flex flex-col gap-6 sm:justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-dark-700 transition-colors">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-white dark:bg-brand-500/20 border border-slate-200 dark:border-brand-500/30 flex items-center justify-center shadow-sm dark:shadow-none shrink-0">
                     <Icons.Terminal className="w-8 h-8 text-brand-600 dark:text-brand-500" />
                  </div>
                  <div className="md:hidden">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{agent.name}</h3>
                    <p className="text-brand-600 dark:text-brand-400 font-mono text-sm">{agent.role}</p>
                  </div>
                </div>
                
                <div className="hidden md:block">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{agent.name}</h3>
                  <p className="text-brand-600 dark:text-brand-400 font-mono mb-6">{agent.role}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-2 sm:mb-8">
                  {agent.compatiblePlatforms.map(p => (
                    <span key={p} className="flex items-center gap-1 px-2.5 py-1.5 bg-white dark:bg-dark-900 rounded-md border border-slate-200 dark:border-dark-600 text-xs font-medium text-slate-600 dark:text-slate-300">
                      <Icons.Check className="w-3 h-3 text-brand-500" /> {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sticky bottom-0 sm:static bg-slate-50 dark:bg-dark-800 pt-4 sm:pt-0 pb-2 sm:pb-0 -mx-6 sm:mx-0 px-6 sm:px-0 border-t sm:border-t-0 border-slate-200 dark:border-dark-700 sm:z-auto z-20">
                <div className="flex justify-between items-end mb-4 sm:block">
                    <div className="text-3xl font-mono font-bold text-slate-900 dark:text-white sm:mb-6">${agent.price} <span className="text-sm text-slate-500 font-sans font-normal block sm:inline">/ one-time</span></div>
                </div>
                <button 
                  onClick={() => {
                    onAddToCart(agent);
                    onClose();
                  }}
                  className="w-full py-4 bg-brand-600 hover:bg-brand-700 dark:hover:bg-brand-500 text-white font-bold rounded-xl sm:rounded-lg shadow-lg shadow-brand-200 dark:shadow-brand-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Icons.ShoppingCart className="w-5 h-5" />
                  Add Source to Cart
                </button>
                <p className="text-center text-xs text-slate-500 mt-4 pb-safe">
                  Instant Download • .zip Package • Lifetime Updates
                </p>
              </div>
            </div>

            {/* Right Column: Specs & Files */}
            <div className="md:col-span-3 p-6 sm:p-8 bg-white dark:bg-dark-900 transition-colors pb-32 sm:pb-8">
              
              <div className="mb-8">
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Capabilities</h4>
                <ul className="space-y-3">
                  {agent.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-slate-50 dark:bg-dark-800/50 p-3 rounded-lg sm:bg-transparent sm:p-0">
                      <Icons.Check className="w-5 h-5 text-brand-600 dark:text-brand-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-200 font-medium sm:font-normal">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Package Contents (Source Code)</h4>
                <div className="bg-slate-50 dark:bg-dark-950 rounded-lg border border-slate-200 dark:border-dark-800 p-4 font-mono text-sm overflow-hidden transition-colors">
                   <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-2 pb-2 border-b border-slate-200 dark:border-dark-800">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400 dark:bg-red-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 dark:bg-yellow-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400 dark:bg-green-500"></span>
                      <span className="ml-2 text-xs text-slate-500 dark:text-slate-400 opacity-75">openops-agent-pkg/</span>
                   </div>
                   <ul className="space-y-2.5">
                     {agent.filesIncluded.map((file, i) => (
                       <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group">
                          {file.type === 'json' ? <Icons.FileJson className="w-4 h-4 text-yellow-600 dark:text-yellow-500 shrink-0" /> : 
                           file.type === 'md' ? <Icons.FileText className="w-4 h-4 text-blue-600 dark:text-blue-500 shrink-0" /> :
                           <Icons.Code className="w-4 h-4 text-green-600 dark:text-green-500 shrink-0" />}
                          <span className="truncate">{file.name}</span>
                          <span className="text-[10px] bg-slate-200 dark:bg-dark-800 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-500 ml-auto">{file.type.toUpperCase()}</span>
                       </li>
                     ))}
                   </ul>
                </div>
              </div>
              
              <div>
                 <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Description</h4>
                 <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                   {agent.description}
                 </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
