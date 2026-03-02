
import React from 'react';
import { Icons } from './Icons';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onBack }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-28 pb-20 animate-fade-in transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white mb-10 transition-colors group"
        >
          <Icons.ArrowLeft className="w-4 h-4" />
          <span>Back to Fleet</span>
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-500 border border-brand-100 dark:border-brand-900/30">
            {isPrivacy ? <Icons.ShieldCheck className="w-8 h-8" /> : <Icons.Scroll className="w-8 h-8" />}
          </div>
          <div>
            <h1 className="text-4xl font-black text-black dark:text-white tracking-tight">
              {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
            </h1>
            <p className="text-gray-500 font-mono text-xs mt-1 uppercase tracking-widest">Last Updated: January 12, 2026</p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
          {isPrivacy ? (
            <>
              <section>
                <h2 className="text-2xl font-bold text-black dark:text-white">1. Data Sovereignty</h2>
                <p>
                  At OpenOps Studio, we treat AI agents as source code artifacts. We do not store your interaction data with the agents you deploy to third-party platforms (Gemini, OpenAI, Anthropic). Your data never trains our models because you own the local copy of the agent logic.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-black dark:text-white">2. Information Collection</h2>
                <p>
                  We collect minimal data required to operate the marketplace:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Account Data:</strong> Email address and name for license management and delivery.</li>
                  <li><strong>Payment Data:</strong> All financial transactions are processed securely via Stripe. We do not store credit card numbers on our local servers.</li>
                  <li><strong>Telemetry:</strong> Anonymous usage data regarding fleet assembly and search queries to improve our ranking algorithms.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-black dark:text-white">3. Third-Party Platforms</h2>
                <p>
                  Our agents are designed to run on external platforms. Please review the privacy policies of Google, OpenAI, and Anthropic, as they govern the data processed during agent execution.
                </p>
              </section>

              <div className="bg-brand-50 dark:bg-brand-900/10 p-6 rounded-2xl border border-brand-100 dark:border-brand-900/20">
                <h3 className="text-brand-700 dark:text-brand-400 font-bold mb-2">GDPR & MENA Compliance</h3>
                <p className="text-sm text-brand-800 dark:text-brand-300 m-0">
                  OpenOps Studio Inc. adheres to strict data classification standards. If you are located in the UAE or EU, you have the right to request full data deletion via your Account Center or by contacting legal@openops.studio.
                </p>
              </div>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-2xl font-bold text-black dark:text-white">1. Nature of the Product</h2>
                <p>
                  OpenOps Agents Fleet provides source code specifications (".zip" archives). These are digital goods. By purchasing, you acknowledge that you are acquiring software blueprints and not a hosted service or a finished consumer application.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-black dark:text-white">2. License Tiers</h2>
                <p>
                  Usage is governed by the specific tier purchased:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Personal:</strong> Single-operator use. No commercial redistribution.</li>
                  <li><strong>Team:</strong> Licensed for up to 10 members within one organization.</li>
                  <li><strong>Enterprise:</strong> Unlimited internal seats and commercial redistribution rights for the specific agent logic.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-black dark:text-white">3. Deterministic AI Disclaimer</h2>
                <p>
                  While OpenOps agents are architected for high reliability and determinism, Large Language Models (LLMs) are inherently probabilistic. OpenOps Studio is not liable for hallucinations, incorrect data, or unexpected behaviors generated by third-party model providers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-black dark:text-white">4. Refund Policy</h2>
                <p>
                  Due to the nature of source code delivery, all sales are final once the ".zip" archive is unlocked and downloaded. If you experience technical defects in the specification logic, please submit a "Verification Issue" in your Account Center for manual review.
                </p>
              </section>
            </>
          )}
        </div>

        <div className="mt-20 pt-10 border-t border-gray-100 dark:border-dark-800 text-center">
          <p className="text-sm text-gray-400">
            For further legal inquiries, please contact <a href="mailto:legal@openops.studio" className="text-brand-600 hover:underline">legal@openops.studio</a>
          </p>
        </div>
      </div>
    </div>
  );
};
