
// tag: don't regression this feature
import React, { useState } from 'react';
import { Icons } from '../Icons';

export const NewsletterBox: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStatus('success');
  };

  return (
    <div className="mt-20 bg-black dark:bg-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
        <Icons.Terminal className="w-64 h-64 text-white dark:text-black -rotate-12 translate-x-12 -translate-y-12" />
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <h3 className="text-3xl font-black text-white dark:text-black mb-3">
            Don't miss the next drop.
          </h3>
          <p className="text-gray-400 dark:text-gray-600 leading-relaxed">
            New specialized agents are commissioned every Tuesday. Join 8,000+ fleet commanders receiving operational briefings.
          </p>
        </div>

        <div className="w-full md:w-auto">
          {status === 'idle' ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="commander@fleet.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-6 py-4 rounded-xl bg-white/10 dark:bg-black/5 border border-white/20 dark:border-black/10 text-white dark:text-black placeholder:text-gray-500 outline-none focus:border-brand-500 transition-colors w-full sm:w-80"
              />
              <button className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2">
                Subscribe <Icons.ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </form>
          ) : (
            <div className="bg-green-500/20 border border-green-500/50 text-green-400 dark:text-green-600 px-8 py-4 rounded-xl flex items-center gap-3 font-bold animate-fade-in">
              <Icons.CheckCircle2 className="w-6 h-6" />
              <span>You're on the list.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};