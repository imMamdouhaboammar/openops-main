
import React from 'react';
import { Icons } from '../../Icons';

export const LogicFlowTab: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="relative bg-slate-900 rounded-2xl p-8 overflow-hidden border border-slate-800 min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md">
          
          {/* Input Node */}
          <div className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-center">
            <div className="text-xs text-slate-400 mb-1">Input Trigger</div>
            <div className="font-mono text-white font-bold">User Query</div>
          </div>

          <Icons.ArrowLeft className="w-6 h-6 text-slate-600 -rotate-90" />

          {/* Logic Node */}
          <div className="w-full bg-brand-900/30 border border-brand-500/50 p-4 rounded-xl text-center shadow-[0_0_30px_rgba(217,119,87,0.1)]">
            <div className="text-xs text-brand-300 mb-1">Core Logic (logic.pseudo)</div>
            <div className="font-mono text-white font-bold">Reasoning Engine</div>
            <div className="text-xs text-slate-400 mt-2 flex justify-center gap-2">
               <span className="bg-slate-900 px-2 py-0.5 rounded">RAG Check</span>
               <span className="bg-slate-900 px-2 py-0.5 rounded">Tone Match</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 w-full">
             <div className="flex flex-col items-center gap-2">
                <Icons.ArrowLeft className="w-6 h-6 text-slate-600 -rotate-[135deg]" />
                <div className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-center">
                  <div className="text-xs text-yellow-500 mb-1">Tool Call (tools.json)</div>
                  <div className="font-mono text-white text-sm">Search / API</div>
                </div>
             </div>
             <div className="flex flex-col items-center gap-2">
                <Icons.ArrowLeft className="w-6 h-6 text-slate-600 -rotate-[45deg]" />
                <div className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-center">
                  <div className="text-xs text-green-500 mb-1">Output</div>
                  <div className="font-mono text-white text-sm">JSON / Text</div>
                </div>
             </div>
          </div>

        </div>
      </div>
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 rounded-r-lg">
        <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2">
          <Icons.Code className="w-4 h-4" />
          Deterministic Architecture
        </h4>
        <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
          This agent uses a multi-step reasoning chain defined in <code>workflow.yml</code> to ensure consistent outputs, minimizing hallucinations by 40% compared to standard zero-shot prompting.
        </p>
      </div>
    </div>
  );
};
