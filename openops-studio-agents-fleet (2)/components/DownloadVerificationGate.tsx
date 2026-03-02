
import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { AgentProduct } from '../types';

interface DownloadVerificationGateProps {
  agent: AgentProduct | null; // Allow null to handle generic downloads if needed
  onVerified: () => void;
  onCancel: () => void;
}

interface CheckItem {
  id: string;
  icon: any;
  title: string;
  description: string;
  checked: boolean;
}

export const DownloadVerificationGate: React.FC<DownloadVerificationGateProps> = ({ agent, onVerified, onCancel }) => {
  const [checks, setChecks] = useState<CheckItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Generate intelligent checks based on agent metadata
    const newChecks: CheckItem[] = [
      {
        id: 'format',
        icon: Icons.FileCode,
        title: 'Source Code Artifact',
        description: 'I understand I am downloading a raw .zip file containing JSON/YAML/MD files, not an executable app.',
        checked: false
      },
      {
        id: 'scope',
        icon: Icons.Cpu,
        title: 'Probabilistic Nature',
        description: 'I acknowledge that AI agents are non-deterministic and require human oversight for critical outputs.',
        checked: false
      }
    ];

    if (agent) {
      // Platform Specific Checks
      if (agent.compatiblePlatforms.includes('Gemini')) {
        newChecks.push({
          id: 'gemini-key',
          icon: Icons.Gemini,
          title: 'Google AI Studio Access',
          description: 'I have access to Google AI Studio to import system instructions.',
          checked: false
        });
      } else if (agent.compatiblePlatforms.includes('ChatGPT')) {
        newChecks.push({
          id: 'gpt-plus',
          icon: Icons.ChatGPT,
          title: 'ChatGPT Plus/Enterprise',
          description: 'I have an active subscription required to create Custom GPTs.',
          checked: false
        });
      }

      // Category Specific Checks
      if (agent.category === 'Engineering') {
        newChecks.push({
          id: 'dev-env',
          icon: Icons.Terminal,
          title: 'Environment Knowledge',
          description: 'I am comfortable using CLI tools or IDEs to inspect the codebase.',
          checked: false
        });
      }
    }

    setChecks(newChecks);
  }, [agent]);

  const toggleCheck = (id: string) => {
    const updated = checks.map(c => c.id === id ? { ...c, checked: !c.checked } : c);
    setChecks(updated);
    setIsReady(updated.every(c => c.checked));
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-200 dark:border-brand-500/30">
          <Icons.ShieldCheck className="w-8 h-8 text-brand-600 dark:text-brand-500" />
        </div>
        <h3 className="text-2xl font-bold text-black dark:text-white">Deployment Readiness Check</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
          To ensure a successful deployment, please verify the following requirements for <span className="font-semibold text-black dark:text-white">{agent?.name || 'this agent'}</span>.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3 mb-6">
        {checks.map((check) => (
          <div 
            key={check.id}
            onClick={() => toggleCheck(check.id)}
            className={`
              flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200
              ${check.checked 
                ? 'bg-green-50 dark:bg-green-900/10 border-green-500 dark:border-green-500/50' 
                : 'bg-white dark:bg-dark-900 border-gray-200 dark:border-dark-800 hover:border-gray-300 dark:hover:border-dark-700'}
            `}
          >
            <div className={`
              mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
              ${check.checked 
                ? 'bg-green-500 border-green-500 text-white' 
                : 'border-gray-300 dark:border-gray-600 bg-transparent'}
            `}>
              {check.checked && <Icons.Check className="w-3.5 h-3.5" />}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <check.icon className={`w-4 h-4 ${check.checked ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                <h4 className={`text-sm font-bold ${check.checked ? 'text-green-900 dark:text-green-100' : 'text-black dark:text-white'}`}>
                  {check.title}
                </h4>
              </div>
              <p className={`text-xs ${check.checked ? 'text-green-700 dark:text-green-300' : 'text-gray-500'}`}>
                {check.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t border-gray-100 dark:border-dark-800 pt-6 flex gap-3">
        <button 
          onClick={onCancel}
          className="px-6 py-3 bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-sm transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={onVerified}
          disabled={!isReady}
          className={`
            flex-1 py-3 font-bold rounded-xl text-white flex items-center justify-center gap-2 transition-all
            ${isReady 
              ? 'bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-200 dark:shadow-brand-900/20 transform hover:scale-[1.02]' 
              : 'bg-gray-300 dark:bg-dark-700 cursor-not-allowed text-gray-500 dark:text-gray-500'}
          `}
        >
          {isReady ? (
            <>
              <Icons.Key className="w-4 h-4" />
              Unlock Download
            </>
          ) : (
            `Verify Requirements (${checks.filter(c => c.checked).length}/${checks.length})`
          )}
        </button>
      </div>
    </div>
  );
};
