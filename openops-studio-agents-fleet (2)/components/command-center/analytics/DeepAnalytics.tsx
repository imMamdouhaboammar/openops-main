
// tag: don't regression this feature
import React from 'react';
import { Icons } from '../../Icons';

export const DeepAnalytics: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-black dark:text-white">Deep Analytics</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Real-time telemetry and resource consumption.</p>
        </div>
        <div className="flex bg-gray-100 dark:bg-dark-900 p-1 rounded-lg">
            {['24h', '7d', '30d'].map((range, i) => (
                <button key={range} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${i === 1 ? 'bg-white dark:bg-dark-800 text-black dark:text-white shadow-sm' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}>
                    {range}
                </button>
            ))}
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-8">
            <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Token Velocity</div>
                <div className="text-3xl font-black text-black dark:text-white font-mono">142.5k <span className="text-sm text-green-500 font-sans font-bold">/ sec</span></div>
            </div>
            <div className="text-right">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Cost</div>
                <div className="text-xl font-bold text-black dark:text-white font-mono">$12.42 <span className="text-xs text-gray-400 font-sans">est.</span></div>
            </div>
        </div>

        {/* Abstract SVG Chart */}
        <div className="relative h-64 w-full overflow-hidden">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-300 dark:text-dark-700">
                <div className="border-t border-dashed border-gray-200 dark:border-dark-800 w-full"></div>
                <div className="border-t border-dashed border-gray-200 dark:border-dark-800 w-full"></div>
                <div className="border-t border-dashed border-gray-200 dark:border-dark-800 w-full"></div>
                <div className="border-t border-dashed border-gray-200 dark:border-dark-800 w-full"></div>
            </div>
            
            {/* The Chart Path */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#D97757" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#D97757" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path d="M0,200 Q150,100 300,150 T600,100 T900,180 T1200,50 L1200,300 L0,300 Z" fill="url(#gradient)" />
                <path d="M0,200 Q150,100 300,150 T600,100 T900,180 T1200,50" fill="none" stroke="#D97757" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            </svg>

            {/* Hover Tooltip (Simulated) */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 rounded pointer-events-none transform -translate-y-2">
                Peak: 180k tokens
            </div>
            <div className="absolute top-1/4 left-1/2 w-3 h-3 bg-brand-500 rounded-full border-2 border-white dark:border-dark-900 -translate-x-1.5 translate-y-4"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Cost Heatmap */}
        <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl p-6">
            <h3 className="font-bold text-black dark:text-white mb-6 flex items-center gap-2">
                <Icons.CreditCard className="w-4 h-4 text-gray-400" /> Cost Distribution
            </h3>
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-24 text-xs font-bold text-gray-500">Gemini Pro</div>
                    <div className="flex-1 h-3 bg-gray-100 dark:bg-dark-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[65%]"></div>
                    </div>
                    <div className="w-12 text-right text-xs font-mono font-bold">$8.10</div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-24 text-xs font-bold text-gray-500">GPT-4 Turbo</div>
                    <div className="flex-1 h-3 bg-gray-100 dark:bg-dark-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[25%]"></div>
                    </div>
                    <div className="w-12 text-right text-xs font-mono font-bold">$3.20</div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-24 text-xs font-bold text-gray-500">Claude Opus</div>
                    <div className="flex-1 h-3 bg-gray-100 dark:bg-dark-800 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[10%]"></div>
                    </div>
                    <div className="w-12 text-right text-xs font-mono font-bold">$1.12</div>
                </div>
            </div>
        </div>

        {/* Efficiency Score */}
        <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl p-6 flex flex-col justify-between">
            <h3 className="font-bold text-black dark:text-white mb-2 flex items-center gap-2">
                <Icons.Zap className="w-4 h-4 text-gray-400" /> Operational Efficiency
            </h3>
            <div className="flex items-end gap-2">
                <span className="text-6xl font-black text-brand-600 dark:text-brand-500">94</span>
                <span className="text-xl font-bold text-gray-400 mb-2">/ 100</span>
            </div>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                Your fleet is optimizing context windows effectively. 
                <span className="text-green-600 dark:text-green-400 font-bold"> Top 5% of users.</span>
            </p>
        </div>

      </div>
    </div>
  );
};
