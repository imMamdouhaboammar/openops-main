
// tag: don't regression this feature
import React from 'react';
import { Icons } from '../../Icons';

export const LogicVisualizer: React.FC = () => {
  return (
    <div className="p-8 bg-slate-50 dark:bg-dark-900 rounded-2xl border border-gray-200 dark:border-dark-800 overflow-hidden relative animate-fade-in">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(circle, #808080 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
        
        {/* Input Node */}
        <div className="flex flex-col items-center gap-2 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
           <div className="w-32 h-20 bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 shadow-sm flex flex-col items-center justify-center relative">
              <span className="absolute -top-3 px-2 py-0.5 bg-gray-100 dark:bg-dark-700 rounded text-[10px] font-bold text-gray-500 border border-gray-200 dark:border-dark-600">Trigger</span>
              <Icons.MessageSquare className="w-6 h-6 text-gray-400 mb-1" />
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">User Input</span>
           </div>
        </div>

        {/* Connector */}
        <Icons.ArrowRight className="w-6 h-6 text-gray-300 dark:text-dark-700 rotate-90 md:rotate-0" />

        {/* Processing Node */}
        <div className="flex flex-col items-center gap-2 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
           <div className="w-40 h-28 bg-white dark:bg-dark-800 rounded-xl border-2 border-brand-500/30 shadow-lg shadow-brand-500/10 flex flex-col items-center justify-center relative">
              <span className="absolute -top-3 px-2 py-0.5 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 rounded text-[10px] font-bold border border-brand-200 dark:border-brand-500/30">Core Logic</span>
              <Icons.Cpu className="w-8 h-8 text-brand-500 mb-2" />
              <span className="text-sm font-bold text-black dark:text-white">Reasoning Engine</span>
              <span className="text-[10px] text-gray-400">Context Window: 128k</span>
           </div>
        </div>

        {/* Connector */}
        <div className="flex md:flex-col items-center gap-2">
            <div className="h-px w-6 md:w-12 bg-gray-300 dark:bg-dark-700"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-dark-600"></div>
        </div>

        {/* Output Nodes (Split) */}
        <div className="flex flex-row md:flex-col gap-4">
           {/* Tool Use */}
           <div className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="w-32 h-16 bg-white dark:bg-dark-800 rounded-xl border border-yellow-200 dark:border-yellow-900/30 flex items-center justify-center gap-2 shadow-sm">
                 <Icons.Wrench className="w-4 h-4 text-yellow-500" />
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Tool Call</span>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">API Fetch</span>
                 </div>
              </div>
           </div>

           {/* Final Response */}
           <div className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="w-32 h-16 bg-white dark:bg-dark-800 rounded-xl border border-green-200 dark:border-green-900/30 flex items-center justify-center gap-2 shadow-sm">
                 <Icons.CheckCircle2 className="w-4 h-4 text-green-500" />
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Output</span>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">JSON / Text</span>
                 </div>
              </div>
           </div>
        </div>

      </div>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400 font-mono">Architecture Diagram v1.0 • Deterministic Flow</p>
      </div>
    </div>
  );
};
