
// tag: don't regression this feature
import React, { useState } from 'react';
import { Icons } from '../Icons';
import { generateSecureApiKey, ApiKeyDefinition } from '../../lib/security/keyGenerator';

export const ApiKeyPanel: React.FC = () => {
  const [keys, setKeys] = useState<ApiKeyDefinition[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  
  // Form State
  const [keyName, setKeyName] = useState('');
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['agents:read']);

  const AVAILABLE_SCOPES = [
    { id: 'agents:read', label: 'Read Agents', desc: 'View fleet status and details' },
    { id: 'agents:write', label: 'Write Agents', desc: 'Deploy and modify agents' },
    { id: 'billing:read', label: 'Read Billing', desc: 'View invoices and usage' },
  ];

  const handleCreateKey = async () => {
    if (!keyName) return;
    setIsGenerating(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const result = await generateSecureApiKey(keyName, selectedScopes);
    
    setKeys(prev => [result.keyDefinition, ...prev]);
    setNewKey(result.secretKey);
    setIsGenerating(false);
    setKeyName('');
    setSelectedScopes(['agents:read']);
  };

  const handleRevoke = (id: string) => {
    if (confirm('Are you sure? This will immediately block any requests using this key.')) {
        setKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'revoked' } : k));
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Simple visual feedback could be added here
  };

  const toggleScope = (scope: string) => {
    setSelectedScopes(prev => 
      prev.includes(scope) ? prev.filter(s => s !== scope) : [...prev, scope]
    );
  };

  return (
    <div className="space-y-6">
      
      {/* 1. New Key Modal / Success State */}
      {newKey && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-2xl animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg text-green-700 dark:text-green-300">
              <Icons.Key className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-900 dark:text-green-100 text-lg">API Key Generated</h3>
              <p className="text-sm text-green-800 dark:text-green-300 mt-1 mb-4">
                This is the only time we will show you the full key. Please copy it and store it securely.
              </p>
              
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white dark:bg-black border border-green-200 dark:border-green-800 p-3 rounded-lg font-mono text-sm break-all text-slate-800 dark:text-slate-200">
                  {newKey}
                </code>
                <button 
                  onClick={() => handleCopy(newKey)}
                  className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors"
                >
                  <Icons.Copy className="w-4 h-4" />
                </button>
              </div>
              
              <button 
                onClick={() => setNewKey(null)}
                className="mt-4 text-sm font-bold text-green-700 dark:text-green-400 hover:underline"
              >
                I have saved the key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Key Generation Form */}
      {!newKey && (
        <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Icons.ShieldCheck className="w-5 h-5 text-brand-600 dark:text-brand-500" />
            <h3 className="font-bold text-black dark:text-white">Generate New Key</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Key Name</label>
                <input 
                  type="text" 
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  placeholder="e.g. CI/CD Pipeline, Production App"
                  className="w-full bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors dark:text-white"
                />
              </div>
              <button 
                onClick={handleCreateKey}
                disabled={!keyName || isGenerating}
                className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isGenerating ? <Icons.RefreshCw className="w-4 h-4 animate-spin" /> : <Icons.Plus className="w-4 h-4" />}
                Create Secret Key
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-3">Access Scopes</label>
              <div className="space-y-2">
                {AVAILABLE_SCOPES.map(scope => (
                  <div 
                    key={scope.id}
                    onClick={() => toggleScope(scope.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedScopes.includes(scope.id)
                      ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-500 dark:border-brand-500'
                      : 'bg-gray-50 dark:bg-dark-950 border-gray-200 dark:border-dark-800 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        selectedScopes.includes(scope.id) ? 'bg-brand-500 border-brand-500' : 'border-gray-400'
                      }`}>
                        {selectedScopes.includes(scope.id) && <Icons.Check className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{scope.label}</div>
                        <div className="text-[10px] text-gray-500">{scope.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Active Keys List */}
      <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-800 bg-gray-50 dark:bg-dark-950">
          <h3 className="font-bold text-sm text-black dark:text-white uppercase tracking-wider">Active Keys</h3>
        </div>
        
        {keys.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            No API keys generated yet.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="text-gray-500 border-b border-gray-100 dark:border-dark-800">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Key Prefix</th>
                <th className="px-6 py-3 font-medium">Created</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-800">
              {keys.map(key => (
                <tr key={key.id} className="group hover:bg-gray-50 dark:hover:bg-dark-800/50">
                  <td className="px-6 py-4 font-bold text-black dark:text-white">
                    {key.name}
                    <div className="flex gap-1 mt-1">
                      {key.scopes.map(s => (
                        <span key={s} className="text-[10px] bg-gray-100 dark:bg-dark-800 px-1.5 py-0.5 rounded text-gray-500 border border-gray-200 dark:border-dark-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-500">
                    {key.prefix}_...{key.preview}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{key.createdAt}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold ${
                      key.status === 'active' 
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                      : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${key.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      {key.status === 'active' ? 'Active' : 'Revoked'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {key.status === 'active' && (
                      <button 
                        onClick={() => handleRevoke(key.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-bold hover:underline"
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
