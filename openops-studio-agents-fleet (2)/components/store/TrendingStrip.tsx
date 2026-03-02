
import React from 'react';
import { AgentProduct } from '../../types';
import { agents } from '../../data';
import { Icons } from '../Icons';

interface TrendingStripProps {
  onView: (agent: AgentProduct) => void;
}

export const TrendingStrip: React.FC<TrendingStripProps> = ({ onView }) => {
  const trending = agents.filter(a => a.isTrending).slice(0, 4);

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <Icons.TrendingUp className="w-4 h-4 text-brand-500" />
          High Velocity Agents
        </h2>
        <div className="h-px flex-1 mx-6 bg-gray-100 dark:bg-dark-900"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trending.map(agent => (
          <div 
            key={agent.id}
            onClick={() => onView(agent)}
            className="group relative p-4 bg-brand-50/30 dark:bg-brand-900/5 border border-brand-100 dark:border-brand-900/20 rounded-2xl cursor-pointer hover:border-brand-500 transition-all overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-white dark:bg-dark-900 border border-brand-100 dark:border-brand-900/30">
                <Icons.Zap className="w-4 h-4 text-brand-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-black dark:text-white truncate">{agent.name}</h3>
                <p className="text-[10px] text-brand-600 dark:text-brand-400 font-mono uppercase tracking-wider">{agent.role}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs font-bold text-black dark:text-white">${agent.price}</span>
              <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">
                <Icons.Activity className="w-3 h-3" />
                +12% Deployment
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
