
// tag: don't regression this feature
import React from 'react';
import { Icons } from '../Icons';

export const BlogHero: React.FC = () => {
  return (
    <div className="relative mb-16 rounded-3xl bg-black dark:bg-white overflow-hidden p-10 md:p-16">
      {/* Abstract Pattern */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 dark:opacity-5">
        <Icons.Activity className="w-[500px] h-[500px] absolute -top-20 -right-20 text-white dark:text-black rotate-12" />
      </div>
      
      <div className="relative z-10 max-w-2xl">
        <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                Intelligence Hub
            </span>
            <span className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Uplink Active
            </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white dark:text-black tracking-tight mb-6 leading-tight">
          Transmission <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-orange-400">Log & Analysis.</span>
        </h1>
        <p className="text-lg text-gray-400 dark:text-gray-600 leading-relaxed mb-8">
          Deep dives into agent architecture, strategic blueprints, and operational reports from the fleet commanders.
        </p>

        <div className="flex gap-4">
             <button className="px-6 py-3 bg-white dark:bg-black text-black dark:text-white font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors flex items-center gap-2">
               <Icons.Rss className="w-4 h-4" /> Subscribe to Feed
             </button>
        </div>
      </div>
    </div>
  );
};
