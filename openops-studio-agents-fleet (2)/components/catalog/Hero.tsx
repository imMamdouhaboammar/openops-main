
// tag: don't regression this feature
import React from 'react';
import { Icons } from '../Icons';
import { SmartSearch } from '../SmartSearch';

interface HeroProps {
  onSearch: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  return (
    <div className="relative mb-12 py-10">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 w-full text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Fleet Operations Live</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-black dark:text-white tracking-tight mb-6 leading-[1.1]">
            Deploy Intelligence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">From Source.</span>
          </h1>
          
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Acquire production-grade AI agent specifications. Verified logic, deterministic workflows, and full source code ownership.
          </p>

          <div className="max-w-xl mx-auto lg:mx-0">
            <SmartSearch onSearchSubmit={onSearch} />
            <div className="flex items-center gap-4 mt-4 text-xs text-gray-400 justify-center lg:justify-start">
              <span>Try searching:</span>
              <button onClick={() => onSearch('SEO')} className="hover:text-brand-500 underline decoration-dotted">SEO Specialist</button>
              <button onClick={() => onSearch('Code')} className="hover:text-brand-500 underline decoration-dotted">Code Review</button>
              <button onClick={() => onSearch('Legal')} className="hover:text-brand-500 underline decoration-dotted">Legal Ops</button>
            </div>
          </div>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-2 gap-4 w-full lg:w-auto shrink-0">
          <div className="p-6 bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 shadow-xl shadow-gray-200/50 dark:shadow-none">
            <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl w-fit mb-4 text-brand-600 dark:text-brand-500">
              <Icons.Cpu className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-black dark:text-white">24</div>
            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Specialized Agents</div>
          </div>
          <div className="p-6 bg-white dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800 shadow-xl shadow-gray-200/50 dark:shadow-none lg:translate-y-8">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl w-fit mb-4 text-blue-600 dark:text-blue-500">
              <Icons.Download className="w-6 h-6" />
            </div>
            <div className="text-3xl font-black text-black dark:text-white">12k+</div>
            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Deployments</div>
          </div>
        </div>
      </div>
    </div>
  );
};