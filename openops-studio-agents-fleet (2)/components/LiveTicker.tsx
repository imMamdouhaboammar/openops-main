
import React, { useState, useEffect } from 'react';
import { agents } from '../data';
import { Icons } from './Icons';

const CITIES = [
  'Dubai', 'Riyadh', 'San Francisco', 'London', 'Berlin', 
  'Cairo', 'Singapore', 'New York', 'Toronto', 'Amsterdam',
  'Doha', 'Jeddah', 'Austin', 'Bangalore', 'Tokyo'
];

const ACTIONS = [
  'deployed',
  'initialized',
  'purchased',
  'forked',
  'scaled'
];

interface TickerData {
  city: string;
  agentName: string;
  action: string;
  timeAgo: string;
}

export const LiveTicker: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<TickerData | null>(null);

  const generateData = () => {
    const randomAgent = agents[Math.floor(Math.random() * agents.length)];
    const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
    const randomAction = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    
    return {
      city: randomCity,
      agentName: randomAgent.name,
      action: randomAction,
      timeAgo: 'just now'
    };
  };

  useEffect(() => {
    const SHOW_DURATION = 6000; // Visible for 6 seconds
    const INTERVAL_DURATION = 30000; // Trigger every 30 seconds

    const triggerNotification = () => {
      setData(generateData());
      setIsVisible(true);

      // Hide after duration
      setTimeout(() => {
        setIsVisible(false);
      }, SHOW_DURATION);
    };

    // Initial appearance after short delay
    const startTimeout = setTimeout(triggerNotification, 2000);

    // Regular interval
    const interval = setInterval(triggerNotification, INTERVAL_DURATION);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!data) return null;

  return (
    <div 
      className={`fixed bottom-4 left-4 z-40 max-w-sm w-full transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="bg-white/90 dark:bg-dark-900/90 backdrop-blur-md border border-slate-200 dark:border-dark-800 shadow-xl rounded-lg p-3 flex items-center gap-3">
        
        {/* Pulse Icon */}
        <div className="relative flex h-3 w-3 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-0.5 flex justify-between">
            <span>{data.city}</span>
            <span className="text-[10px] opacity-60">{data.timeAgo}</span>
          </p>
          <p className="text-xs font-medium text-slate-900 dark:text-white truncate">
            <span className="text-brand-600 dark:text-brand-500 font-bold">{data.action}</span>{' '}
            <span className="font-mono">{data.agentName}</span>
          </p>
        </div>

        <div className="shrink-0 text-slate-400">
          <Icons.Terminal className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
