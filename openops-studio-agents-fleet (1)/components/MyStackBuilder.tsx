
import React, { useState } from 'react';
import { agents } from '../data';
import { Icons } from './Icons';
import { AgentProduct } from '../types';
import { ToastMessage } from './SmartToast';

interface MyStackBuilderProps {
  onBack: () => void;
  onAddToCart: (agent: AgentProduct) => void;
  setToast: (toast: ToastMessage | null) => void;
}

export const MyStackBuilder: React.FC<MyStackBuilderProps> = ({ onBack, onAddToCart, setToast }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [stackName, setStackName] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const toggleAgent = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(i => i !== id));
    } else {
      if (selectedIds.length >= 4) {
        setToast({
          id: Date.now().toString(),
          title: "Maximum Capacity Reached",
          description: "You can only select up to 4 agents to ensure optimal visual layout for the social card.",
          type: "warning"
        });
        return;
      }
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const selectedAgents = agents.filter(a => selectedIds.includes(a.id));
  const totalPrice = selectedAgents.reduce((sum, a) => sum + a.price, 0);
  
  const handleGenerate = () => {
    if (!stackName || selectedIds.length === 0) return;
    setIsGenerated(true);
    // Simulate link generation
    const slug = stackName.toLowerCase().replace(/\s+/g, '-');
    const uniqueId = Math.random().toString(36).substr(2, 5);
    setGeneratedLink(`https://openops.fleet/stack/${slug}-${uniqueId}`);
    
    setToast({
      id: Date.now().toString(),
      title: "Stack Generated Successfully",
      description: "Your custom fleet link is ready to share.",
      type: "success"
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setToast({
      id: Date.now().toString(),
      title: "Link Copied",
      description: "Stack URL copied to clipboard.",
      type: "success"
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black pt-24 pb-20 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <button onClick={onBack} className="text-sm text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-2 mb-4 transition-colors">
              <Icons.ArrowLeft className="w-4 h-4" /> Back to Fleet
            </button>
            <h1 className="text-3xl font-black text-black dark:text-white tracking-tight">
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-600">Dream Stack</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Curate a custom fleet. Share the link. Earn 10% credit on every sale.
            </p>
          </div>
          
          {selectedIds.length > 0 && (
            <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl p-4 flex items-center gap-6 shadow-lg">
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold">Agents</div>
                <div className="text-xl font-black text-black dark:text-white">{selectedIds.length}/4</div>
              </div>
              <div className="h-8 w-px bg-gray-200 dark:bg-dark-800"></div>
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold">Value</div>
                <div className="text-xl font-black text-brand-600 dark:text-brand-500">${totalPrice}</div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Selection Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-dark-900 rounded-2xl border border-gray-200 dark:border-dark-800 p-6 shadow-sm">
              <input
                type="text"
                placeholder="Name your stack (e.g. 'SaaS Launch Kit')"
                value={stackName}
                onChange={(e) => setStackName(e.target.value)}
                disabled={isGenerated}
                className="w-full text-2xl font-bold bg-transparent border-b-2 border-gray-100 dark:border-dark-800 focus:border-brand-500 outline-none pb-2 placeholder:text-gray-300 dark:placeholder:text-dark-700 transition-colors dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {agents.filter(a => !a.isBundle).map(agent => {
                const isSelected = selectedIds.includes(agent.id);
                return (
                  <div 
                    key={agent.id}
                    onClick={() => !isGenerated && toggleAgent(agent.id)}
                    className={`
                      relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${isSelected 
                        ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/10' 
                        : 'border-transparent bg-white dark:bg-dark-900 hover:border-gray-200 dark:hover:border-dark-700 shadow-sm'}
                      ${isGenerated ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-white dark:bg-dark-800 text-brand-500' : 'bg-gray-100 dark:bg-dark-800 text-gray-500'}`}>
                        <Icons.Terminal className="w-5 h-5" />
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center animate-fade-in">
                          <Icons.Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-black dark:text-white leading-tight mb-1">{agent.name}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{agent.role}</p>
                    <div className="mt-3 font-mono text-xs font-bold text-gray-400">${agent.price}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Preview & Action */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              
              {/* The Social Card Preview */}
              <div className="relative aspect-[1.91/1] w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group">
                {/* Abstract Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-brand-900/40"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 blur-[80px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full"></div>

                {/* Content */}
                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-brand-400 font-mono text-xs uppercase tracking-[0.2em] mb-4">
                      <Icons.Layers className="w-4 h-4" />
                      OpenOps Fleet Stack
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-white leading-none tracking-tight">
                      {stackName || "Untitled Stack"}
                    </h2>
                  </div>

                  <div className="flex items-center gap-4">
                    {selectedAgents.length > 0 ? (
                      <div className="flex -space-x-4">
                        {selectedAgents.map((a, i) => (
                          <div key={i} className="w-12 h-12 rounded-xl bg-white dark:bg-dark-800 border-2 border-slate-900 flex items-center justify-center shadow-lg transform transition-transform hover:-translate-y-1">
                            <Icons.Terminal className="w-6 h-6 text-brand-600 dark:text-brand-500" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-12 flex items-center text-slate-500 text-sm italic">Select agents...</div>
                    )}
                    
                    {selectedAgents.length > 0 && (
                      <div className="ml-auto text-right">
                        <div className="text-xs text-slate-400 uppercase font-bold">Total Power</div>
                        <div className="text-2xl font-mono font-bold text-white">${totalPrice}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Watermark */}
                <div className="absolute bottom-4 right-4 text-[10px] text-white/20 font-mono">
                  openops.fleet
                </div>
              </div>

              {/* Action Area */}
              <div className="mt-8 space-y-4">
                {!isGenerated ? (
                  <button 
                    onClick={handleGenerate}
                    disabled={!stackName || selectedIds.length === 0}
                    className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    <Icons.Sparkles className="w-5 h-5" />
                    Generate Share Link
                  </button>
                ) : (
                  <div className="animate-fade-in-up space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 p-4 rounded-xl flex items-start gap-3">
                      <Icons.CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-green-800 dark:text-green-300 text-sm">Stack Published!</h4>
                        <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                          Anyone who buys via this link earns you <strong>10% store credit</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1 bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl px-4 py-3 text-sm font-mono text-gray-500 truncate">
                        {generatedLink}
                      </div>
                      <button 
                        onClick={copyLink}
                        className="px-6 font-bold bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 rounded-xl hover:bg-brand-200 transition-colors"
                      >
                        Copy
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-2 py-3 bg-black text-white rounded-xl font-bold text-sm hover:opacity-80">
                        <Icons.SiX className="w-4 h-4" /> Share on X
                      </button>
                      <button className="flex items-center justify-center gap-2 py-3 bg-[#0077b5] text-white rounded-xl font-bold text-sm hover:opacity-80">
                        <Icons.SiLinkedin className="w-4 h-4" /> LinkedIn
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => setIsGenerated(false)}
                      className="w-full py-2 text-sm text-gray-400 hover:text-black dark:hover:text-white"
                    >
                      Edit Stack
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
