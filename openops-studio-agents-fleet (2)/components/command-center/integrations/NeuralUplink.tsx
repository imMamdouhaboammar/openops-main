
// tag: don't regression this feature
import React, { useState } from 'react';
import { Icons } from '../../Icons';

interface ProviderStatus {
  id: string;
  name: string;
  icon: any; // Using any for the component reference
  status: 'connected' | 'disconnected' | 'latency_warning';
  latency: string;
  uptime: string;
  apiKeyLast4: string;
}

const PROVIDERS: ProviderStatus[] = [
  { id: 'gemini', name: 'Google Gemini', icon: Icons.Gemini, status: 'connected', latency: '45ms', uptime: '99.99%', apiKeyLast4: 'A8d2' },
  { id: 'gpt', name: 'OpenAI GPT-4', icon: Icons.ChatGPT, status: 'latency_warning', latency: '240ms', uptime: '99.85%', apiKeyLast4: '9fK1' },
  { id: 'claude', name: 'Anthropic Claude', icon: Icons.Claude, status: 'disconnected', latency: '-', uptime: '-', apiKeyLast4: '' },
];

export const NeuralUplink: React.FC = () => {
  const [connectingId, setConnectingId] = useState<string | null>(null);

  const handleConnect = (id: string) => {
    setConnectingId(id);
    setTimeout(() => {
      setConnectingId(null);
      // Logic to update status would go here
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-black dark:text-white flex items-center gap-3">
            Neural Uplink
            <span className="px-2 py-1 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 text-[10px] font-bold uppercase tracking-widest border border-brand-200 dark:border-brand-500/30">
              v2.1 Secured
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage external model runtime connections and API gateways.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-lg text-sm hover:opacity-90 transition-opacity">
          <Icons.RefreshCw className="w-4 h-4" />
          Ping All Nodes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {PROVIDERS.map((provider) => {
          const isConnected = provider.status !== 'disconnected';
          const isWarning = provider.status === 'latency_warning';

          return (
            <div key={provider.id} className="group relative overflow-hidden bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl p-6 transition-all hover:border-brand-500/50 hover:shadow-lg dark:hover:shadow-brand-900/10">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <provider.icon className="w-24 h-24 rotate-12" />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                
                {/* Icon & Status */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-dark-800 flex items-center justify-center border border-gray-100 dark:border-dark-700">
                    <provider.icon className={`w-8 h-8 ${isConnected ? 'text-black dark:text-white' : 'text-gray-400'}`} />
                  </div>
                  {isConnected && (
                    <div className="absolute -bottom-1 -right-1 flex h-4 w-4">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isWarning ? 'bg-yellow-400' : 'bg-green-400'}`}></span>
                      <span className={`relative inline-flex rounded-full h-4 w-4 border-2 border-white dark:border-dark-900 ${isWarning ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-bold text-black dark:text-white">{provider.name}</h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-xs font-mono">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Icons.Activity className="w-3 h-3" />
                      <span>Latency: <span className={isWarning ? 'text-yellow-600 dark:text-yellow-400 font-bold' : 'text-black dark:text-white'}>{provider.latency}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Icons.Clock className="w-3 h-3" />
                      <span>Uptime: <span className="text-black dark:text-white">{provider.uptime}</span></span>
                    </div>
                  </div>
                </div>

                {/* Key Input / Action */}
                <div className="w-full md:w-auto flex flex-col items-end gap-3">
                  {isConnected ? (
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-dark-950 px-4 py-2 rounded-lg border border-gray-200 dark:border-dark-800 w-full md:w-auto justify-between">
                      <div className="flex items-center gap-2">
                        <Icons.Key className="w-3 h-3 text-gray-400" />
                        <span className="font-mono text-xs text-gray-600 dark:text-gray-300">•••• •••• •••• {provider.apiKeyLast4}</span>
                      </div>
                      <button className="text-xs font-bold text-red-500 hover:underline">Revoke</button>
                    </div>
                  ) : (
                    <div className="w-full md:w-64">
                        <input 
                            type="password" 
                            placeholder="sk-..." 
                            className="w-full bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 rounded-lg px-3 py-2 text-xs outline-none focus:border-brand-500 transition-colors"
                        />
                    </div>
                  )}

                  <div className="flex gap-2 w-full">
                    {isConnected ? (
                        <button className="flex-1 md:flex-none px-4 py-2 border border-gray-200 dark:border-dark-700 rounded-lg text-xs font-bold hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors">
                            Configure Limits
                        </button>
                    ) : (
                        <button 
                            onClick={() => handleConnect(provider.id)}
                            disabled={connectingId === provider.id}
                            className="flex-1 md:flex-none px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            {connectingId === provider.id ? (
                                <>
                                    <Icons.RefreshCw className="w-3 h-3 animate-spin" /> Verifying...
                                </>
                            ) : (
                                <>Connect Gateway</>
                            )}
                        </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-6 rounded-2xl flex items-start gap-4">
        <Icons.ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
        <div>
            <h4 className="font-bold text-sm text-blue-900 dark:text-blue-300">End-to-End Encryption</h4>
            <p className="text-xs text-blue-700 dark:text-blue-400 mt-1 leading-relaxed">
                API keys are encrypted at rest using AES-256 and are only decrypted in the secure enclave during runtime execution. OpenOps Studio employees never have access to your keys.
            </p>
        </div>
      </div>
    </div>
  );
};
