
import React from 'react';
import { Icons } from '../Icons';
import { SmartSearch } from '../SmartSearch';

interface CatalogHeaderProps {
  onSearch: (query: string) => void;
}

export const CatalogHeader: React.FC<CatalogHeaderProps> = ({ onSearch }) => {
  return (
    <div className="mb-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black text-black dark:text-white tracking-tight mb-4 leading-none">
            The <span className="text-brand-500">Fleet</span> Catalog
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
            Browse engineering-grade agent specifications. Verified source code packages for production environments.
          </p>
        </div>
        
        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-2xl font-black text-black dark:text-white font-mono">1,240+</div>
            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Deployments</div>
          </div>
          <div className="w-px h-10 bg-gray-200 dark:bg-dark-800"></div>
          <div className="text-center">
            <div className="text-2xl font-black text-black dark:text-white font-mono">99.9%</div>
            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Reliability</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SmartSearch onSearchSubmit={onSearch} />
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-3 bg-gray-100 dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl font-bold text-sm text-gray-600 dark:text-gray-300 hover:border-brand-500 transition-all flex items-center gap-2">
            <Icons.Filter className="w-4 h-4" />
            Sort: Popular
          </button>
        </div>
      </div>
    </div>
  );
};
