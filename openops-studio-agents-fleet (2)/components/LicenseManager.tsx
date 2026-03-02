
import React, { useState } from 'react';
import { Icons } from './Icons';
import { useUser } from '../hooks/useUser';

interface LicenseManagerProps {
  onBack: () => void;
}

// Mock Data for demo purposes
const MY_LICENSES = [
  {
    id: 'lic_123',
    agentName: 'CEO Advisor / Orchestrator',
    version: 'v1.2.0',
    purchaseDate: '2023-10-15',
    status: 'Active',
    verified: false,
  },
  {
    id: 'lic_456',
    agentName: 'Code Review Sentinel',
    version: 'v2.0.1',
    purchaseDate: '2023-11-02',
    status: 'Active',
    verified: true, // Already verified example
  }
];

export const LicenseManager: React.FC<LicenseManagerProps> = ({ onBack }) => {
  const { user, verifyOperator } = useUser();
  const [licenses, setLicenses] = useState(MY_LICENSES);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [proofLink, setProofLink] = useState('');

  const handleVerifyStart = (id: string) => {
    setVerifyingId(id);
    setUploadState('idle');
    setProofLink('');
  };

  const handleSubmitVerification = () => {
    if (!proofLink && uploadState !== 'success') return; // Simple validation

    setUploadState('uploading');
    
    // Simulate API Check
    setTimeout(() => {
      setUploadState('success');
      
      // Update local license state
      setLicenses(prev => prev.map(l => l.id === verifyingId ? { ...l, verified: true } : l));
      
      // Update Global User State (The Badge)
      if (!user.isVerifiedOperator) {
        verifyOperator();
      }

      setTimeout(() => {
        setVerifyingId(null);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black pt-24 pb-20 animate-fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <button onClick={onBack} className="text-sm text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-2 mb-4 transition-colors">
            <Icons.ArrowLeft className="w-4 h-4" /> Back to Fleet
          </button>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-black dark:text-white tracking-tight flex items-center gap-3">
                Command Center
                {user.isVerifiedOperator && (
                  <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs px-3 py-1 rounded-full border border-yellow-200 dark:border-yellow-800 flex items-center gap-1 font-bold uppercase tracking-wider">
                    <Icons.Award className="w-4 h-4" /> Certified Operator
                  </span>
                )}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Manage your active agent licenses and operational status.
              </p>
            </div>
            
            {user.isVerifiedOperator ? (
               <div className="bg-gradient-to-r from-brand-600 to-purple-600 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-4">
                 <div className="p-2 bg-white/20 rounded-lg">
                   <Icons.Percent className="w-6 h-6 text-white" />
                 </div>
                 <div>
                   <div className="font-bold text-sm uppercase tracking-wider opacity-80">Elite Status Active</div>
                   <div className="font-black text-xl">5% OFF All Future Deployments</div>
                 </div>
               </div>
            ) : (
              <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 px-6 py-4 rounded-xl flex items-center gap-4">
                 <div className="p-2 bg-gray-100 dark:bg-dark-800 rounded-lg">
                   <Icons.Lock className="w-6 h-6 text-gray-400" />
                 </div>
                 <div>
                   <div className="font-bold text-sm text-black dark:text-white">Unverified Operator</div>
                   <div className="text-xs text-gray-500">Verify 1 deployment to unlock perks.</div>
                 </div>
               </div>
            )}
          </div>
        </div>

        {/* License Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-black dark:text-white border-b border-gray-200 dark:border-dark-800 pb-4">
            Active Deployments
          </h2>

          {licenses.map(license => (
            <div key={license.id} className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
              
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-dark-800 flex items-center justify-center shrink-0">
                <Icons.Terminal className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-bold text-black dark:text-white">{license.agentName}</h3>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-1 text-xs text-gray-500">
                  <span className="bg-gray-100 dark:bg-dark-800 px-2 py-0.5 rounded font-mono">{license.version}</span>
                  <span>Purchased: {license.purchaseDate}</span>
                  <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {license.status}
                  </span>
                </div>
              </div>

              <div className="w-full md:w-auto">
                {license.verified ? (
                  <div className="flex items-center justify-center gap-2 px-6 py-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 text-green-700 dark:text-green-400 rounded-xl font-bold text-sm">
                    <Icons.CheckCircle2 className="w-5 h-5" />
                    Verified Live
                  </div>
                ) : (
                  <button 
                    onClick={() => handleVerifyStart(license.id)}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-brand-50 dark:bg-brand-900/10 border border-brand-200 dark:border-brand-900/30 text-brand-700 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-900/20 rounded-xl font-bold text-sm transition-colors"
                  >
                    <Icons.ShieldCheck className="w-5 h-5" />
                    Verify Deployment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Verification Modal/Overlay */}
        {verifyingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm" onClick={() => setVerifyingId(null)} />
            <div className="relative w-full max-w-md bg-white dark:bg-dark-900 rounded-2xl shadow-2xl p-8 animate-fade-in-up border border-gray-200 dark:border-dark-800">
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                  <Icons.Activity className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white">Verify Operational Status</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Upload a screenshot of this agent running in your environment (ChatGPT/Claude/Gemini) to unlock your badge.
                </p>
              </div>

              {uploadState === 'success' ? (
                <div className="text-center py-8">
                  <Icons.CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                  <h4 className="text-lg font-bold text-green-600 dark:text-green-400">Verification Complete!</h4>
                  <p className="text-sm text-gray-500">Updating your operator status...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Live Agent URL (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="https://chat.openai.com/g/..." 
                      value={proofLink}
                      onChange={(e) => setProofLink(e.target.value)}
                      className="w-full p-3 bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 rounded-xl text-sm outline-none focus:border-brand-500 dark:text-white"
                    />
                  </div>

                  <div className="border-2 border-dashed border-gray-200 dark:border-dark-700 rounded-xl p-8 text-center cursor-pointer hover:border-brand-500 dark:hover:border-brand-500 transition-colors group">
                    <Icons.Upload className="w-8 h-8 text-gray-400 group-hover:text-brand-500 mx-auto mb-2 transition-colors" />
                    <p className="text-sm font-medium text-gray-500 group-hover:text-brand-500">Click to upload Screenshot</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                  </div>

                  <button 
                    onClick={handleSubmitVerification}
                    disabled={uploadState === 'uploading'}
                    className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {uploadState === 'uploading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Verifying...
                      </>
                    ) : (
                      'Submit Verification'
                    )}
                  </button>
                  
                  <button onClick={() => setVerifyingId(null)} className="w-full py-2 text-gray-400 hover:text-black dark:hover:text-white text-sm font-medium">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
