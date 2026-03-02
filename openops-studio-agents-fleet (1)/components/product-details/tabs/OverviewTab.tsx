
import React from 'react';
import { AgentProduct } from '../../../types';
import { Icons } from '../../Icons';

interface OverviewTabProps {
  agent: AgentProduct;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ agent }) => {
  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* High Level Stats */}
      <div className="grid grid-cols-3 gap-4">
         <div className="p-4 bg-gray-50 dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-800">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Architecture</div>
            <div className="font-bold text-black dark:text-white">Modular Chain</div>
         </div>
         <div className="p-4 bg-gray-50 dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-800">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Context Window</div>
            <div className="font-bold text-black dark:text-white">4k - 128k</div>
         </div>
         <div className="p-4 bg-gray-50 dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-800">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Est. Cost</div>
            <div className="font-bold text-black dark:text-white">~$0.02 / run</div>
         </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-black dark:text-white mb-4">Executive Summary</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
          {agent.description}
        </p>
      </div>
      
      <div className="bg-white dark:bg-dark-950 rounded-xl border border-gray-200 dark:border-dark-800 overflow-hidden">
        <div className="bg-gray-50 dark:bg-dark-900 px-6 py-4 border-b border-gray-200 dark:border-dark-800">
           <h4 className="font-bold text-sm">Included Source Files</h4>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-dark-900">
          {agent.filesIncluded.map((file, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-dark-900/50 transition-colors">
              {file.type === 'json' ? <Icons.FileJson className="w-5 h-5 text-yellow-600 dark:text-yellow-500" /> : 
               file.type === 'md' ? <Icons.FileText className="w-5 h-5 text-blue-600 dark:text-blue-500" /> :
               file.type === 'yml' ? <Icons.FileCode className="w-5 h-5 text-purple-600 dark:text-purple-500" /> :
               file.type === 'pseudo' ? <Icons.FileType className="w-5 h-5 text-green-600 dark:text-green-500" /> :
               <Icons.Code className="w-5 h-5 text-gray-400" />}
              <div className="flex-1">
                 <div className="font-mono text-sm text-black dark:text-white font-medium">{file.name}</div>
                 <div className="text-xs text-gray-500 mt-0.5">{file.description}</div>
              </div>
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">{file.type.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
