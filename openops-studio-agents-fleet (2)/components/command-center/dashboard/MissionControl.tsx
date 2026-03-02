
import React from 'react';
import { Icons } from '../../Icons';

export const MissionControl: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-black dark:text-white">Mission Control</h2>
        <span className="text-xs font-mono text-gray-400">CYCLE: 2024-Q4</span>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 p-6 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Icons.Activity className="w-4 h-4" /> Est. ROI
            </div>
            <div className="text-3xl font-black text-black dark:text-white">$4,250</div>
            <div className="text-xs text-green-500 font-bold mt-1">+12% vs last month</div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-5">
            <Icons.TrendingUp className="w-24 h-24" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 p-6 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Icons.Clock className="w-4 h-4" /> Hours Saved
            </div>
            <div className="text-3xl font-black text-black dark:text-white">142h</div>
            <div className="text-xs text-brand-500 font-bold mt-1">~18 work days</div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-5">
            <Icons.Zap className="w-24 h-24" />
          </div>
        </div>

        <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 p-6 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Icons.ShieldCheck className="w-4 h-4" /> Operational
            </div>
            <div className="text-3xl font-black text-black dark:text-white">100%</div>
            <div className="text-xs text-gray-500 font-bold mt-1">All systems nominal</div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-5">
            <Icons.Activity className="w-24 h-24" />
          </div>
        </div>
      </div>

      {/* Deployment Health Map */}
      <div className="bg-slate-900 dark:bg-black border border-slate-800 dark:border-dark-800 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="flex items-center justify-between mb-8 relative z-10">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Icons.Globe className="w-5 h-5 text-blue-500" /> Deployment Matrix
          </h3>
          <div className="flex gap-4 text-xs font-mono">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Gemini</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span>GPT</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500"></span>Claude</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-blue-500/20 flex items-center justify-center">
                <Icons.Briefcase className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="font-bold text-sm">Strategic Agents</div>
                <div className="text-xs text-gray-400">2 Active Units</div>
              </div>
            </div>
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-slate-900"></div>
              <div className="w-6 h-6 rounded-full bg-orange-500 border-2 border-slate-900"></div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-green-500/20 flex items-center justify-center">
                <Icons.Code className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="font-bold text-sm">Engineering Agents</div>
                <div className="text-xs text-gray-400">1 Active Unit</div>
              </div>
            </div>
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-slate-900"></div>
            </div>
          </div>
        </div>

        {/* Abstract Deco */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};
