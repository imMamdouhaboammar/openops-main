
import React from 'react';
import { Icons } from './Icons';

export const Manifesto: React.FC<{onExplore: () => void}> = ({ onExplore }) => {
  return (
    <div className="pt-24 pb-20 bg-white dark:bg-dark-950 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-500/30 text-brand-700 dark:text-brand-400 text-xs font-mono mb-6">
             <Icons.Terminal className="w-3 h-3" />
             <span>The OpenOps Doctrine</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Stop Vibe-Prompting.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-600 dark:from-brand-400 dark:to-blue-500">Start Engineering.</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            We believe AI Agents are not magic. They are software artifacts that require specification, version control, and architectural integrity.
          </p>
        </div>

        {/* The Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <div className="bg-slate-50 dark:bg-dark-900 p-8 rounded-2xl border border-slate-200 dark:border-dark-800">
             <h3 className="flex items-center gap-3 text-xl font-bold text-red-600 dark:text-red-400 mb-4">
               <Icons.X className="w-6 h-6" />
               The "Black Box" Problem
             </h3>
             <p className="text-slate-600 dark:text-slate-400 mb-6">
               Most AI adoption today is "vibe-based." Users guess prompts into a chat box, hoping for a good result. It's unrepeatable, unscalable, and opaque. You don't own the logic; the model provider does.
             </p>
             <ul className="space-y-3">
               <li className="flex gap-2 text-sm text-slate-500 dark:text-slate-500">
                 <span className="text-red-400">✗</span> Hidden system instructions
               </li>
               <li className="flex gap-2 text-sm text-slate-500 dark:text-slate-500">
                 <span className="text-red-400">✗</span> No version history
               </li>
               <li className="flex gap-2 text-sm text-slate-500 dark:text-slate-500">
                 <span className="text-red-400">✗</span> Generic, non-expert personas
               </li>
             </ul>
          </div>

          <div className="bg-brand-50/50 dark:bg-brand-900/10 p-8 rounded-2xl border border-brand-200 dark:border-brand-500/20">
             <h3 className="flex items-center gap-3 text-xl font-bold text-brand-700 dark:text-brand-400 mb-4">
               <Icons.Check className="w-6 h-6" />
               The OpenOps Standard
             </h3>
             <p className="text-slate-700 dark:text-slate-300 mb-6">
               We treat Agents as <span className="font-bold">Source Code</span>. When you buy from OpenOps, you get the raw architectural blueprints: JSON schemas for tools, Markdown for personas, and rigorous testing logs.
             </p>
             <ul className="space-y-3">
               <li className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                 <Icons.FileJson className="w-4 h-4 text-brand-600" /> Full <span className="font-mono">tools.json</span> definitions
               </li>
               <li className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                 <Icons.FileText className="w-4 h-4 text-brand-600" /> Detailed <span className="font-mono">system_prompt.md</span>
               </li>
               <li className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                 <Icons.Cpu className="w-4 h-4 text-brand-600" /> Platform Agnostic (Gemini/Claude/GPT)
               </li>
             </ul>
          </div>
        </div>

        {/* Core Principles */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">Our Engineering Principles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 hover:border-brand-500/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Icons.Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Determinism over Magic</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                We design agents to be boringly predictable. A business tool should work the same way every time.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 hover:border-brand-500/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <Icons.Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Expert-In-The-Loop</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Our "Legal Ops" agent wasn't written by a chatbot. It was architected by a lawyer, then encoded by an engineer.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 hover:border-brand-500/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <Icons.Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Data Sovereignty</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                You host the code. You manage the context window. Your data never trains our models because you own the agent.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 dark:bg-white rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] bg-brand-500 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white dark:text-slate-900 mb-6">Ready to upgrade your workforce?</h2>
            <p className="text-slate-300 dark:text-slate-600 mb-8 max-w-lg mx-auto">
              Browse our catalog of pre-architected agents. Download the source. Deploy in minutes.
            </p>
            <button 
              onClick={onExplore}
              className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white dark:bg-brand-600 dark:hover:bg-brand-700 dark:text-white font-bold rounded-lg transition-all transform hover:scale-105"
            >
              Explore the Fleet
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
