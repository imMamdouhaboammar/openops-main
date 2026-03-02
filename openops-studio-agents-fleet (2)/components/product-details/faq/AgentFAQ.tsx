
// tag: don't regression this feature
import React, { useState } from 'react';
import { Icons } from '../../Icons';

export const AgentFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "Do I need a ChatGPT Plus subscription?", a: "Yes, to use this agent as a 'Custom GPT', you need a Plus subscription. However, the raw system prompts work with the API or free interfaces manually." },
    { q: "Can I modify the agent's logic?", a: "Absolutely. You are purchasing the source files (JSON, Markdown, Pseudo-code). You have full ownership to edit, fork, and refine the logic." },
    { q: "Is this agent updated?", a: "We provide lifetime updates for the major version (v1.x). If the underlying model providers (OpenAI/Anthropic) make breaking changes, we patch the fleet within 48 hours." },
    { q: "What is the refund policy?", a: "Since this is a digital source code download, we offer refunds only if the code is technically defective. However, our team provides installation support to ensure it works." }
  ];

  return (
    <div className="mt-12 max-w-3xl">
      <h3 className="text-xl font-bold text-black dark:text-white mb-6">Frequently Asked Questions</h3>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-gray-200 dark:border-dark-800 rounded-xl bg-white dark:bg-dark-900 overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-dark-850 transition-colors"
            >
              <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{faq.q}</span>
              <Icons.ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && (
              <div className="px-4 pb-4 pt-0 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
