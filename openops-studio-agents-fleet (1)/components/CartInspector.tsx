
import React, { useMemo, useState } from 'react';
import { AgentProduct } from '../types';
import { analyzeFleet } from '../lib/engine';
import { Icons } from './Icons';

interface CartInspectorProps {
  items: AgentProduct[];
}

export const CartInspector: React.FC<CartInspectorProps> = ({ items }) => {
  const analysis = useMemo(() => analyzeFleet(items), [items]);
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) return null;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500 border-green-500';
    if (score >= 70) return 'text-yellow-500 border-yellow-500';
    return 'text-red-500 border-red-500';
  };

  return (
    <div className="bg-slate-50 dark:bg-dark-950 border-b border-slate-200 dark:border-dark-800 animate-fade-in">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <Icons.Activity className="w-5 h-5 text-brand-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Fleet Inspector</h3>
        </div>
        <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-mono font-bold text-sm ${getScoreColor(analysis.score)}`}>
            {analysis.score}
            </div>
            <Icons.ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 animate-fade-in">
            {/* Stack Visualization */}
            <div className="flex gap-1 h-2 w-full mb-6 rounded-full overflow-hidden bg-slate-200 dark:bg-dark-800">
                <div 
                className={`h-full transition-all duration-500 ${analysis.stackCoverage.strategic ? 'bg-purple-500 w-1/3' : 'bg-transparent w-1/3'}`} 
                title="Strategic Layer"
                />
                <div 
                className={`h-full transition-all duration-500 ${analysis.stackCoverage.execution ? 'bg-blue-500 w-1/3' : 'bg-transparent w-1/3'}`} 
                title="Execution Layer"
                />
                <div 
                className={`h-full transition-all duration-500 ${analysis.stackCoverage.operations ? 'bg-green-500 w-1/3' : 'bg-transparent w-1/3'}`} 
                title="Operations Layer"
                />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono mb-6 uppercase">
                <span className={analysis.stackCoverage.strategic ? 'text-purple-600 dark:text-purple-400 font-bold' : ''}>Strategy</span>
                <span className={analysis.stackCoverage.execution ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}>Execution</span>
                <span className={analysis.stackCoverage.operations ? 'text-green-600 dark:text-green-400 font-bold' : ''}>Ops</span>
            </div>

            {/* Issues List */}
            <div className="space-y-3">
                {analysis.issues.map((issue, idx) => (
                <div key={idx} className={`p-3 rounded-lg border text-xs flex gap-3 ${
                    issue.type === 'error' ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30' :
                    issue.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/30' :
                    issue.type === 'success' ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' :
                    'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/30'
                }`}>
                    <div className="shrink-0 mt-0.5">
                    {issue.type === 'error' && <Icons.AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />}
                    {issue.type === 'warning' && <Icons.AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />}
                    {issue.type === 'success' && <Icons.CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />}
                    {issue.type === 'info' && <Icons.Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    </div>
                    <div>
                    <div className={`font-bold mb-0.5 ${
                        issue.type === 'error' ? 'text-red-800 dark:text-red-300' :
                        issue.type === 'warning' ? 'text-yellow-800 dark:text-yellow-300' :
                        issue.type === 'success' ? 'text-green-800 dark:text-green-300' :
                        'text-blue-800 dark:text-blue-300'
                    }`}>{issue.title}</div>
                    <div className="text-slate-600 dark:text-slate-400 leading-relaxed">{issue.message}</div>
                    </div>
                </div>
                ))}
            </div>

            {items.length > 1 && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-dark-800">
                <div className="flex items-center gap-2 mb-2">
                    <Icons.GitMerge className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-bold text-slate-500 uppercase">Common Runtime</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {analysis.platformCompatibility.fragmented ? (
                    <span className="text-xs text-red-500 font-mono">No common runtime found.</span>
                    ) : (
                        analysis.platformCompatibility.common.length > 0 ? (
                        analysis.platformCompatibility.common.map(p => (
                            <span key={p} className="px-2 py-1 bg-slate-200 dark:bg-dark-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded uppercase">
                            {p}
                            </span>
                        ))
                        ) : (
                        <span className="text-xs text-slate-400">Add more agents to analyze runtime.</span>
                        )
                    )}
                </div>
                </div>
            )}
        </div>
      )}
    </div>
  );
};
