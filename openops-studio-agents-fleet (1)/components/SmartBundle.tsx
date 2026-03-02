
import React, { useMemo } from 'react';
import { AgentProduct } from '../types';
import { getSmartRecommendations } from '../lib/engine';
import { Icons } from './Icons';

interface SmartBundleProps {
  currentItems: AgentProduct[];
  onAdd: (agent: AgentProduct) => void;
}

export const SmartBundle: React.FC<SmartBundleProps> = ({ currentItems, onAdd }) => {
  const recommendations = useMemo(() => getSmartRecommendations(currentItems), [currentItems]);

  if (recommendations.length === 0) return null;

  return (
    <div className="border-b border-slate-200 dark:border-dark-800 p-6 bg-brand-50/20 dark:bg-brand-900/5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icons.GitMerge className="w-4 h-4 text-brand-600 dark:text-brand-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
            Fleet Completion
          </h3>
        </div>
        <span className="text-[10px] font-bold bg-brand-500 text-white px-2 py-0.5 rounded shadow-sm">
          15% BUNDLE DISCOUNT
        </span>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <div 
            key={idx} 
            className={`
              relative overflow-hidden rounded-xl border p-4 shadow-sm transition-all
              ${rec.type === 'org-chart' 
                ? 'bg-white dark:bg-dark-900 border-brand-200 dark:border-brand-900/30 ring-1 ring-brand-100 dark:ring-brand-900/20' 
                : 'bg-white dark:bg-dark-900 border-slate-200 dark:border-dark-800'}
            `}
          >
            {/* Org Chart Visual Connector */}
            {rec.type === 'org-chart' && (
              <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
                <Icons.Workflow className="w-24 h-24 text-brand-500 rotate-[-15deg]" />
              </div>
            )}

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  {rec.type === 'org-chart' ? (
                    <span className="text-[10px] font-mono font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-1.5 py-0.5 rounded border border-brand-100 dark:border-brand-900/30">
                      ORG CHART GAP
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                      OPTIMIZATION
                    </span>
                  )}
                </div>
              </div>

              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                {rec.reason}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {rec.impact}
              </p>
              
              <div className="flex gap-3 items-center bg-slate-50 dark:bg-dark-950 p-2 rounded-lg border border-slate-100 dark:border-dark-800">
                <div className="w-10 h-10 rounded bg-white dark:bg-dark-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-dark-700">
                  <Icons.Cpu className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">{rec.agent.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-slate-400 line-through">${rec.agent.price}</span>
                    <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-500">
                      ${(rec.agent.price * 0.85).toFixed(0)}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => onAdd(rec.agent)}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-all text-xs font-bold shadow-md shadow-brand-200 dark:shadow-none"
                >
                  <Icons.ShoppingCart className="w-3.5 h-3.5" />
                  Add Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
