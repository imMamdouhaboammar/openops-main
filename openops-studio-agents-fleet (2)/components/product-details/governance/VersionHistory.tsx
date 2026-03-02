
// tag: don't regression this feature
import React from 'react';
import { Icons } from '../../Icons';

export const VersionHistory: React.FC = () => {
  const history = [
    { version: 'v1.2.0', date: 'Oct 15, 2024', changes: ['Added Claude 3.5 Sonnet support', 'Optimized prompt latency by 15%'], type: 'major' },
    { version: 'v1.1.5', date: 'Sep 28, 2024', changes: ['Fixed JSON output schema validation', 'Updated dependency packages'], type: 'patch' },
    { version: 'v1.1.0', date: 'Aug 10, 2024', changes: ['Initial release of specialized agent core'], type: 'major' },
  ];

  return (
    <div className="bg-white dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-800 p-6 animate-fade-in">
      <h3 className="font-bold text-black dark:text-white mb-6 flex items-center gap-2">
        <Icons.GitMerge className="w-5 h-5 text-gray-500" />
        Version History
      </h3>
      
      <div className="relative border-l-2 border-gray-100 dark:border-dark-800 ml-3 space-y-8">
        {history.map((release, i) => (
          <div key={i} className="relative pl-8">
            {/* Dot */}
            <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-white dark:border-dark-900 ${
              release.type === 'major' ? 'bg-brand-500' : 'bg-gray-400 dark:bg-dark-600'
            }`}></div>
            
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
               <div className="flex items-center gap-3">
                 <span className="font-mono font-bold text-lg text-black dark:text-white">{release.version}</span>
                 <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                   release.type === 'major' 
                   ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400' 
                   : 'bg-gray-100 dark:bg-dark-800 text-gray-500'
                 }`}>
                   {release.type}
                 </span>
               </div>
               <span className="text-xs text-gray-400 font-mono">{release.date}</span>
            </div>
            
            <ul className="space-y-1">
              {release.changes.map((change, idx) => (
                <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-300 dark:bg-dark-600 shrink-0"></span>
                  {change}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
