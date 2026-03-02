
import React from 'react';
import { Icons } from '../../Icons';

const MY_FLEET = [
  {
    id: 'lic_1',
    name: 'CEO Advisor / Orchestrator',
    role: 'Strategic',
    version: 'v1.2.0',
    latestVersion: 'v1.2.0',
    platform: ['Gemini', 'Claude'],
    status: 'Operational',
    lastUpdated: '2 days ago'
  },
  {
    id: 'lic_2',
    name: 'Code Review Sentinel',
    role: 'Engineering',
    version: 'v2.0.1',
    latestVersion: 'v2.1.0', // Update available
    platform: ['ChatGPT'],
    status: 'Update Ready',
    lastUpdated: '1 week ago'
  },
  {
    id: 'lic_3',
    name: 'Egyptian Dialect Writer',
    role: 'Creative',
    version: 'v1.0.0',
    latestVersion: 'v1.0.0',
    platform: ['Gemini'],
    status: 'Operational',
    lastUpdated: '3 weeks ago'
  }
];

export const FleetRegistry: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-black dark:text-white">Fleet Registry</h2>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors">
            <Icons.Search className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors">
            <Icons.Filter className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {MY_FLEET.map((item) => {
          const hasUpdate = item.latestVersion !== item.version;
          return (
            <div key={item.id} className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl p-5 flex flex-col md:flex-row items-center gap-6 group hover:border-brand-500/30 transition-all">
              
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-dark-800 flex items-center justify-center shrink-0">
                <Icons.Terminal className="w-6 h-6 text-gray-500" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <h3 className="font-bold text-black dark:text-white">{item.name}</h3>
                  {hasUpdate && (
                    <span className="px-2 py-0.5 rounded-full bg-brand-500 text-white text-[10px] font-bold uppercase tracking-wider animate-pulse">
                      Update v{item.latestVersion}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-gray-500">
                  <span className="font-mono bg-gray-50 dark:bg-dark-950 px-2 py-1 rounded border border-gray-200 dark:border-dark-800">
                    {item.version}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icons.Cpu className="w-3 h-3" /> {item.platform.join(', ')}
                  </span>
                  <span>Last Sync: {item.lastUpdated}</span>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-4 py-2 border border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-800 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 transition-colors flex items-center justify-center gap-2">
                  <Icons.FileText className="w-3 h-3" /> Docs
                </button>
                <button 
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                    hasUpdate 
                      ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20' 
                      : 'bg-black dark:bg-white text-white dark:text-black hover:opacity-80'
                  }`}
                >
                  <Icons.Download className="w-3 h-3" />
                  {hasUpdate ? 'Update Source' : 'Download'}
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
