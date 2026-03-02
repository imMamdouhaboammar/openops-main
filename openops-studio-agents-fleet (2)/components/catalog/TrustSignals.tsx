
// tag: don't regression this feature
import React from 'react';
import { Icons } from '../Icons';

export const TrustSignals: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y border-gray-100 dark:border-dark-900 my-16">
      <div className="flex items-center gap-4 group">
        <div className="p-3 rounded-2xl bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-500 group-hover:scale-110 transition-transform">
          <Icons.ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <div className="font-bold text-black dark:text-white text-sm">Verified Logic</div>
          <div className="text-xs text-gray-500">Security scanned code</div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 group">
        <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-500 group-hover:scale-110 transition-transform">
          <Icons.GitMerge className="w-6 h-6" />
        </div>
        <div>
          <div className="font-bold text-black dark:text-white text-sm">Version Control</div>
          <div className="text-xs text-gray-500">Full git history</div>
        </div>
      </div>

      <div className="flex items-center gap-4 group">
        <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-500 group-hover:scale-110 transition-transform">
          <Icons.Cpu className="w-6 h-6" />
        </div>
        <div>
          <div className="font-bold text-black dark:text-white text-sm">Multi-Runtime</div>
          <div className="text-xs text-gray-500">Claude • GPT • Gemini</div>
        </div>
      </div>

      <div className="flex items-center gap-4 group">
        <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-500 group-hover:scale-110 transition-transform">
          <Icons.Zap className="w-6 h-6" />
        </div>
        <div>
          <div className="font-bold text-black dark:text-white text-sm">Instant Deploy</div>
          <div className="text-xs text-gray-500">Setup in &lt; 5 mins</div>
        </div>
      </div>
    </div>
  );
};