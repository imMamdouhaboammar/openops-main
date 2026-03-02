
// tag: don't regression this feature
import React, { useState } from 'react';
import { Icons } from '../Icons';
import { MissionControl } from './dashboard/MissionControl';
import { FleetRegistry } from './inventory/FleetRegistry';
import { OperatorStatus } from './profile/OperatorStatus';
import { SystemLog } from './logs/SystemLog';
import { NeuralUplink } from './integrations/NeuralUplink';
import { DeepAnalytics } from './analytics/DeepAnalytics';

interface CommandCenterProps {
  onBack: () => void;
}

type View = 'mission' | 'fleet' | 'uplink' | 'analytics' | 'profile' | 'logs';

export const CommandCenter: React.FC<CommandCenterProps> = ({ onBack }) => {
  const [activeView, setActiveView] = useState<View>('mission');

  const navItems = [
    { id: 'mission', label: 'Mission Control', icon: Icons.Layout },
    { id: 'fleet', label: 'Fleet Registry', icon: Icons.Cpu },
    { id: 'uplink', label: 'Neural Uplink', icon: Icons.GitMerge },
    { id: 'analytics', label: 'Deep Analytics', icon: Icons.BarChart },
    { id: 'profile', label: 'Operator Profile', icon: Icons.ShieldCheck },
    { id: 'logs', label: 'System Logs', icon: Icons.Terminal },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black pt-20 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black dark:hover:text-white uppercase tracking-wider transition-colors"
          >
            <Icons.ArrowLeft className="w-4 h-4" /> Exit Command
          </button>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-green-600 dark:text-green-400 font-bold">SYSTEM ONLINE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl p-4 shadow-sm">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id as View)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                      activeView === item.id
                        ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-dark-800 px-2">
                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-2">Fleet Status</div>
                <div className="flex items-center justify-between text-xs font-mono text-gray-600 dark:text-gray-300">
                  <span>Capacity</span>
                  <span>84%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-dark-800 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-brand-500 w-[84%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <div className="animate-fade-in">
              {activeView === 'mission' && <MissionControl />}
              {activeView === 'fleet' && <FleetRegistry />}
              {activeView === 'uplink' && <NeuralUplink />}
              {activeView === 'analytics' && <DeepAnalytics />}
              {activeView === 'profile' && <OperatorStatus />}
              {activeView === 'logs' && <SystemLog />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
