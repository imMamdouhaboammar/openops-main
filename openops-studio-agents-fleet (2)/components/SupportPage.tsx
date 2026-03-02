
import React, { useState } from 'react';
import { Icons } from './Icons';

interface SupportPageProps {
  onBack: () => void;
}

const FAQ_ITEMS = [
  {
    question: "What exactly do I get when I purchase an agent?",
    answer: "You receive a production-grade source code package (.zip) containing specialized system prompts, tool definitions (JSON), reasoning logic (YAML/Pseudo), and RAG knowledge artifacts. You can deploy these to Gemini, ChatGPT, or Claude manually or via our CLI."
  },
  {
    question: "Can I use these agents for commercial projects?",
    answer: "Yes. All OpenOps Agents include a commercial use license for the specific seat count or organization tier purchased. You can integrate them into your client products or internal workflows."
  },
  {
    question: "How do updates work?",
    answer: "We offer lifetime updates for individual agent specifications. When a vendor releases a new version (e.g., v1.1 to v1.2), it will appear automatically in your Command Center for re-download."
  },
  {
    question: "Is there a refund policy?",
    answer: "Due to the nature of digital source code delivery, we offer a 14-day conditional refund policy. If the agent logic fails to perform according to its technical specification and we cannot resolve it, a full credit is issued."
  },
  {
    question: "Do you offer technical integration support?",
    answer: "Standard licenses include community support via Discord. Enterprise licenses include 24/7 priority integration support from our engineering team."
  }
];

export const SupportPage: React.FC<SupportPageProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    { title: "Getting Started", icon: Icons.Zap, desc: "Installation guides and unzipping basics." },
    { title: "Licensing & Seats", icon: Icons.Key, desc: "Managing team access and commercial rights." },
    { title: "Technical Issues", icon: Icons.Terminal, desc: "YAML errors, tool calls, and model settings." },
    { title: "Vendor Support", icon: Icons.Briefcase, desc: "How to list and sell your own agent specs." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black pt-28 pb-20 animate-fade-in transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white mb-8 mx-auto transition-colors group"
          >
            <Icons.ArrowLeft className="w-4 h-4" />
            <span>Back to Catalog</span>
          </button>
          
          <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tight mb-6">
            How can we <span className="text-brand-500">help?</span>
          </h1>
          
          {/* Support Search */}
          <div className="max-w-2xl mx-auto relative group">
            <input 
              type="text"
              placeholder="Search help articles (e.g. 'refunds', 'gemini setup')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-12 pr-6 bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none focus:ring-4 focus:ring-brand-500/10 outline-none transition-all dark:text-white"
            />
            <Icons.Search className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {categories.map((cat, i) => (
            <div key={i} className="p-6 bg-white dark:bg-dark-900 border border-gray-100 dark:border-dark-800 rounded-2xl hover:border-brand-500 transition-all group cursor-pointer shadow-sm hover:shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-dark-950 flex items-center justify-center mb-4 text-gray-400 group-hover:text-brand-500 transition-colors">
                <cat.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-black dark:text-white mb-2">{cat.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-8 flex items-center gap-3">
              <Icons.MessageSquare className="w-6 h-6 text-brand-500" />
              Common Questions
            </h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-dark-900 border border-gray-100 dark:border-dark-800 rounded-2xl overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-dark-800/50 transition-colors"
                  >
                    <span className="font-bold text-black dark:text-white">{item.question}</span>
                    <Icons.ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-50 dark:border-dark-800 pt-4">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Contact */}
          <div className="space-y-6">
            <div className="p-8 bg-slate-900 dark:bg-dark-950 rounded-3xl text-white relative overflow-hidden border border-slate-800">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Icons.HelpCircle className="w-24 h-24" />
               </div>
               <h3 className="text-xl font-bold mb-4 relative z-10">Still Stuck?</h3>
               <p className="text-slate-400 text-sm mb-8 leading-relaxed relative z-10">
                 Our support agents (real ones, mostly) are ready to help you with your custom fleet integration.
               </p>
               <div className="space-y-3 relative z-10">
                 <button className="w-full py-3 bg-brand-600 hover:bg-brand-500 rounded-xl font-bold transition-all shadow-lg shadow-brand-900/50 flex items-center justify-center gap-2">
                   <Icons.SiGithub className="w-4 h-4" />
                   Open a Ticket
                 </button>
                 <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all border border-white/10 text-sm">
                   Email Engineering
                 </button>
               </div>
            </div>

            <div className="p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 text-sm mb-2 flex items-center gap-2">
                <Icons.Activity className="w-4 h-4" />
                Fleet Status
              </h4>
              <p className="text-xs text-blue-700 dark:text-blue-400 mb-4">Marketplace and download services are operating normally.</p>
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase text-blue-600 dark:text-blue-500">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Uptime: 99.98%
              </div>
            </div>
          </div>
        </div>

        {/* Footer Support Tag */}
        <div className="mt-20 py-10 border-t border-gray-100 dark:border-dark-900 text-center">
          <p className="text-sm text-gray-400">
            OpenOps Studio Inc. Support Center — Version 2026.1.4
          </p>
        </div>

      </div>
    </div>
  );
};
