import React from 'react';
import { Icons } from './Icons';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-950 border-t border-slate-200 dark:border-dark-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-brand-50 dark:bg-brand-500/10 p-1.5 rounded border border-brand-200 dark:border-brand-500/20">
                <Icons.Terminal className="h-5 w-5 text-brand-600 dark:text-brand-500" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">OpenOps Studio</span>
            </div>
            <p className="text-slate-500 dark:text-slate-500 max-w-sm mb-6">
              Empowering the next generation of automated enterprises with engineering-grade AI agent specifications.
            </p>
            <div className="flex gap-4 text-slate-400 dark:text-slate-400">
               <Icons.MessageSquare className="w-5 h-5 hover:text-brand-600 dark:hover:text-brand-500 cursor-pointer transition-colors" />
               <Icons.Code className="w-5 h-5 hover:text-brand-600 dark:hover:text-brand-500 cursor-pointer transition-colors" />
               <Icons.Globe className="w-5 h-5 hover:text-brand-600 dark:hover:text-brand-500 cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">The Fleet</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li className="hover:text-brand-600 dark:hover:text-brand-500 cursor-pointer transition-colors">Strategic Agents</li>
              <li className="hover:text-brand-600 dark:hover:text-brand-500 cursor-pointer transition-colors">Engineering Agents</li>
              <li className="hover:text-brand-600 dark:hover:text-brand-500 cursor-pointer transition-colors">Creative Agents</li>
              <li className="hover:text-brand-600 dark:hover:text-brand-500 cursor-pointer transition-colors">MENA Specialized</li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li className="hover:text-brand-600 dark:hover:text-brand-500 cursor-pointer transition-colors">AgentSpec Framework</li>
              <li className="hover:text-brand-600 dark:hover:text-brand-500 cursor-pointer transition-colors">Gemini Integration Guide</li>
              <li className="hover:text-brand-600 dark:hover:text-brand-500 cursor-pointer transition-colors">Claude Skills Setup</li>
              <li className="hover:text-brand-600 dark:hover:text-brand-500 cursor-pointer transition-colors">Support</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-100 dark:border-dark-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 dark:text-slate-600 text-sm">
          <div className="flex flex-col md:flex-row gap-1 md:gap-2 text-center md:text-left">
            <p>© 2024 OpenOps Studio Inc.</p>
            <span className="hidden md:inline">•</span>
            <p>Registered in the United Arab Emirates.</p>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-slate-700 dark:hover:text-slate-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-700 dark:hover:text-slate-400 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};