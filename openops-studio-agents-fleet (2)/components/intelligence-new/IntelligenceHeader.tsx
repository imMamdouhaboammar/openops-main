
// tag: don't regression this feature
import React from 'react';
import { Icons } from '../Icons';

export const IntelligenceHeader: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-950 dark:bg-black border border-slate-800 dark:border-slate-800 p-8 md:p-12 mb-12">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
              OpenOps Knowledge Base
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
            Blogs & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-orange-400">Guides</span>
          </h1>
          
          <p className="text-lg text-slate-400 leading-relaxed font-light">
            Master the art of AI orchestration. From strategic business frameworks for non-tech leaders to deep-dive implementation blueprints for engineers.
          </p>
        </div>

        <div className="flex flex-col gap-3 min-w-[200px]">
           <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 bg-brand-500/20 rounded-lg text-brand-400">
                 <Icons.BookOpen className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-xs text-slate-400 uppercase font-bold">New Guide</div>
                 <div className="text-white font-bold text-sm">Agent Architecture</div>
              </div>
           </div>
           <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                 <Icons.ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-xs text-slate-400 uppercase font-bold">Updated</div>
                 <div className="text-white font-bold text-sm">Security Protocols</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
