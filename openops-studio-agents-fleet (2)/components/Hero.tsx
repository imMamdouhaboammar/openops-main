
import React from 'react';
import { Icons } from './Icons';

interface HeroProps {
  onExplore: () => void;
  onViewDocs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onViewDocs }) => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-black pt-32 pb-20 lg:pt-48 lg:pb-32 border-b border-gray-100 dark:border-dark-900 transition-colors duration-300">
      {/* Background decoration - Updated Colors */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none opacity-40 dark:opacity-60">
         <div className="absolute top-[-10%] left-[10%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-brand-200/30 dark:bg-brand-900/10 rounded-full blur-[100px]" />
         <div className="absolute bottom-[-10%] right-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gray-200/40 dark:bg-dark-800/20 rounded-full blur-[100px]" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-dark-800 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-800 text-black dark:text-white text-xs sm:text-sm font-mono mb-8 animate-fade-in-up transition-colors hover:border-brand-500/50 cursor-default">
           <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
           <span className="tracking-wide">OpenOps V1.0 Available</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-black dark:text-white tracking-tighter mb-6 transition-colors leading-[1.1]">
          OpenOps Agents Fleet: <br className="hidden sm:block" />
          <span className="text-brand-500 selection:bg-brand-500 selection:text-white">Deploy AI from Source.</span>
        </h1>
        
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 transition-colors px-4 font-light leading-relaxed">
          The premium marketplace for verified AI Agent specifications. <br className="hidden sm:block" />
          Stop prompting blindly. Start engineering with <span className="text-black dark:text-white font-medium border-b border-brand-500/30">deterministic code</span>.
        </p>
        
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
          <button 
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-4 bg-black dark:bg-white text-white dark:text-black hover:bg-brand-500 dark:hover:bg-brand-500 dark:hover:text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-xl shadow-gray-200/50 dark:shadow-none flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            Explore Fleet
            <Icons.ChevronRight className="w-5 h-5" />
          </button>
          <button 
            onClick={onViewDocs}
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-black dark:text-white border border-gray-200 dark:border-dark-800 hover:border-black dark:hover:border-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            <Icons.FileText className="w-5 h-5" />
            Documentation
          </button>
        </div>

        <div className="mt-16 sm:mt-20 pt-10 border-t border-gray-100 dark:border-dark-900 flex flex-wrap justify-center gap-6 sm:gap-12 text-gray-500 dark:text-gray-500 font-mono text-xs sm:text-sm px-4">
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300">
            <Icons.Gemini className="w-4 h-4" />
            <span>Gemini Gems</span>
          </div>
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300">
             <Icons.ChatGPT className="w-4 h-4" />
             <span>ChatGPT</span>
          </div>
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300">
             <Icons.Claude className="w-4 h-4" />
             <span>Claude Skills</span>
          </div>
        </div>
      </div>
    </div>
  );
};
