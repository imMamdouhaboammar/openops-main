
import React from 'react';
import { Icons } from '../Icons';

export const TrustBar: React.FC = () => {
  const checks = [
    { label: 'Secret-Free', icon: Icons.ShieldCheck, color: 'text-green-500' },
    { label: 'Trivy Scanned', icon: Icons.Terminal, color: 'text-blue-500' },
    { label: 'MIT/Apache OSS', icon: Icons.Scroll, color: 'text-purple-500' },
    { label: 'Instant .ZIP', icon: Icons.FileCode, color: 'text-orange-500' },
  ];

  return (
    <div className="py-6 border-y border-gray-100 dark:border-dark-900 mb-16 overflow-x-auto scrollbar-hide">
      <div className="flex justify-between items-center min-w-[800px] px-4">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Manifest Checks:</span>
        {checks.map((check, i) => (
          <div key={i} className="flex items-center gap-2 group">
            <check.icon className={`w-4 h-4 ${check.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{check.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
