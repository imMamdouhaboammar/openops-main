
// tag: don't regression this feature
import React from 'react';
import { Collection } from '../../../types';
import { Icons } from '../../Icons';

interface CollectionsRailProps {
  collections: Collection[];
  activeCollectionId: string | null;
  onSelectCollection: (id: string | null) => void;
}

export const CollectionsRail: React.FC<CollectionsRailProps> = ({ collections, activeCollectionId, onSelectCollection }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <Icons.Layers className="w-4 h-4 text-brand-500" />
          Curated Stacks
        </h3>
        {activeCollectionId && (
          <button 
            onClick={() => onSelectCollection(null)}
            className="text-xs font-bold text-brand-600 dark:text-brand-500 hover:underline"
          >
            Clear Selection
          </button>
        )}
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
        {collections.map((col) => {
          const isActive = activeCollectionId === col.id;
          return (
            <div 
              key={col.id}
              onClick={() => onSelectCollection(isActive ? null : col.id)}
              className={`
                relative flex-shrink-0 w-72 p-6 rounded-2xl cursor-pointer transition-all duration-300 snap-center
                border overflow-hidden group
                ${isActive 
                  ? 'border-brand-500 ring-2 ring-brand-500/20 scale-[1.02]' 
                  : 'border-gray-200 dark:border-dark-800 bg-white dark:bg-dark-900 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-xl'}
              `}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${col.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              )}

              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors
                ${isActive 
                  ? 'bg-brand-500 text-white' 
                  : 'bg-gray-100 dark:bg-dark-800 text-gray-500 group-hover:text-black dark:group-hover:text-white'}
              `}>
                <col.icon className="w-5 h-5" />
              </div>

              <h4 className="font-bold text-lg text-black dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-500 transition-colors">
                {col.title}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {col.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                <span>View Stack</span>
                <Icons.ArrowLeft className="w-3 h-3 rotate-180 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};