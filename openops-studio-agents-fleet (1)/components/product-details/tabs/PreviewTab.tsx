
import React from 'react';
import { AgentProduct } from '../../../types';
import { Icons } from '../../Icons';

interface PreviewTabProps {
  agent: AgentProduct;
}

export const PreviewTab: React.FC<PreviewTabProps> = ({ agent }) => {
  
  // Mock Conversation Data based on Category
  const getMockConversation = () => {
    if (agent.category === 'Creative') {
      return [
        { role: 'user', text: "Write a tweet about coffee for a Cairo audience." },
        { role: 'agent', text: "صباح الخير يا مصريين! ☕️🇪🇬\n\nالقهوة مش مجرد مشروب، دي 'ضبطة الدماغ' الرسمية قبل زحمة الكوبري. 😉\n\nمنشن صاحبك اللي مبيعرفش يفتح عينه غير لما يشربها!\n\n#صباح_الخير #قهوة #مصر #مود_النهارده" }
      ];
    } else if (agent.category === 'Engineering') {
      return [
        { role: 'user', text: "Review this React component for performance." },
        { role: 'agent', text: "**Performance Audit Report** ⚡️\n\n1. **Excessive Re-renders**: You are passing an inline object `{{ style: ... }}` to the header. Move this to a `const` outside the render cycle.\n2. **Heavy Computation**: The `expensiveCalc()` function runs on every render. Wrap it in `useMemo`.\n\n**Recommendation:**\nRefactor lines 12-18 to ensure O(1) render complexity." }
      ];
    }
    return [
      { role: 'user', text: "Create a strategic roadmap for Q4." },
      { role: 'agent', text: "Processing Q4 Strategy...\n\n**Objective:** Maximize Enterprise Adoptions.\n\n**Key Results (OKRs):**\n1. Secure 5 POCs with Fortune 500 companies.\n2. Reduce onboarding time from 3 days to 4 hours.\n3. Launch 'Enterprise Guard' security suite.\n\nShall I expand on the resource allocation for these OKRs?" }
    ];
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-gray-50 dark:bg-dark-900 p-6 rounded-2xl border border-gray-200 dark:border-dark-800">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-200 dark:border-dark-800 pb-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Live Simulation</span>
        </div>
        <div className="space-y-6">
          {getMockConversation().map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-200 dark:bg-dark-700' : 'bg-brand-500 text-white'}`}>
                {msg.role === 'user' ? <Icons.Users className="w-4 h-4" /> : <Icons.Terminal className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-tr-none' 
                : 'bg-brand-50 dark:bg-brand-900/20 text-black dark:text-white rounded-tl-none border border-brand-100 dark:border-brand-900/30'
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex gap-2">
          <input disabled type="text" placeholder="Try asking something..." className="flex-1 bg-white dark:bg-dark-950 border border-gray-200 dark:border-dark-800 rounded-lg px-4 py-3 text-sm opacity-60 cursor-not-allowed" />
          <button disabled className="bg-brand-500 opacity-60 text-white px-4 rounded-lg cursor-not-allowed">
            <Icons.ArrowLeft className="w-5 h-5 rotate-180" />
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          * This is a static simulation of the agent's behavior style defined in <code>profile.md</code>.
        </p>
      </div>
    </div>
  );
};
