
// tag: don't regression this feature
import React from 'react';
import { AgentProduct } from '../../types';
import { Icons } from '../Icons';

interface FeaturedBundleProps {
  bundle: AgentProduct;
  onView: (agent: AgentProduct) => void;
}

export const FeaturedBundle: React.FC<FeaturedBundleProps> = ({ bundle, onView }) => {
  if (!bundle) return null;

  return (
    <div className="col-span-1 md:col-span-2 relative group cursor-pointer" onClick={() => onView(bundle)}>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-500 via-purple-500 to-blue-500 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity blur-xl"></div>
      <div className="relative h-full bg-white dark:bg-dark-900 border border-brand-100 dark:border-brand-900/30 rounded-2xl p-8 overflow-hidden hover:border-brand-300 dark:hover:border-brand-500/50 transition-colors">
        
        {/* Decorative BG */}
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Icons.Layers className="w-48 h-48 rotate-12" />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-gradient-to-r from-brand-500 to-purple-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                Featured Collection
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-dark-800 text-gray-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Save 15%
              </span>
            </div>
            
            <h3 className="text-3xl font-black text-black dark:text-white mb-2">{bundle.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
              {bundle.description}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-dark-800 border-2 border-white dark:border-dark-900 flex items-center justify-center">
                  <Icons.Terminal className="w-5 h-5 text-gray-400" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xs border-2 border-white dark:border-dark-900 pl-1">
                +2
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400 line-through font-mono">$348</div>
              <div className="text-2xl font-black text-brand-600 dark:text-brand-500 font-mono">${bundle.price}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};