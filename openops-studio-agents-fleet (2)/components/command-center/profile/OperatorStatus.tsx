
import React from 'react';
import { Icons } from '../../Icons';
import { useUser } from '../../../hooks/useUser';

export const OperatorStatus: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-black dark:text-white">Operator Profile</h2>

      <div className="bg-gradient-to-br from-brand-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/10 flex items-center justify-center backdrop-blur-sm">
            <span className="text-4xl font-black">{user?.name.charAt(0) || 'U'}</span>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h3 className="text-2xl font-bold">{user?.name || 'Operator'}</h3>
              {user?.isVerifiedOperator && <Icons.CheckCircle2 className="w-6 h-6 text-green-400" />}
            </div>
            <p className="text-brand-100 font-mono text-sm mb-4">ID: {user?.id || 'OP-000000'}</p>
            
            <div className="max-w-md mx-auto md:mx-0">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                <span>Level {user?.operatorLevel || 1}</span>
                <span>{user?.accountMaturityScore || 0}/100 XP</span>
              </div>
              <div className="h-3 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                  className="h-full bg-white transition-all duration-1000" 
                  style={{ width: `${user?.accountMaturityScore || 0}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-2xl font-black">3</div>
              <div className="text-[10px] uppercase font-bold opacity-70">Licenses</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-2xl font-black">1</div>
              <div className="text-[10px] uppercase font-bold opacity-70">Verified</div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-brand-400/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl p-6">
          <h4 className="font-bold text-black dark:text-white mb-4 flex items-center gap-2">
            <Icons.ShieldCheck className="w-5 h-5 text-gray-400" /> Security
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-950 rounded-xl border border-gray-100 dark:border-dark-800">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Two-Factor Auth</span>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-bold uppercase">Disabled</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-950 rounded-xl border border-gray-100 dark:border-dark-800">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">API Keys</span>
              <span className="text-xs text-gray-400">0 Active</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl p-6">
          <h4 className="font-bold text-black dark:text-white mb-4 flex items-center gap-2">
            <Icons.CreditCard className="w-5 h-5 text-gray-400" /> Billing
          </h4>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-950 border border-dashed border-gray-300 dark:border-dark-700 text-center">
            <p className="text-xs text-gray-500 mb-2">Next invoice: Nov 01, 2024</p>
            <button className="text-brand-600 dark:text-brand-500 text-xs font-bold hover:underline">Manage Payment Methods</button>
          </div>
        </div>
      </div>
    </div>
  );
};
