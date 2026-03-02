
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icons';
import { CartItem } from '../types';
import { DownloadVerificationGate } from './DownloadVerificationGate';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchasedItems: CartItem[];
}

type DeployStep = 'success' | 'verification' | 'platform' | 'guide' | 'github-export';
type Platform = 'Gemini' | 'ChatGPT' | 'Claude';
type GithubState = 'idle' | 'connecting' | 'configuring' | 'pushing' | 'complete';

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ isOpen, onClose, purchasedItems }) => {
  const [step, setStep] = useState<DeployStep>('success');
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  
  // GitHub Export State
  const [ghState, setGhState] = useState<GithubState>('idle');
  const [repoName, setRepoName] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Growth Hack: Secret Artifact State
  const [isBonusUnlocked, setIsBonusUnlocked] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Pay-it-Forward Logic
  const [giftCode, setGiftCode] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(24 * 60 * 60); // 24 hours in seconds
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('success');
      setPlatform(null);
      setIsVerified(false);
      setIsBonusUnlocked(false);
      setIsSharing(false);
      setGhState('idle');
      setLogs([]);
      
      if (purchasedItems.length > 0) {
        setRepoName(`openops-${purchasedItems[0].name.toLowerCase().replace(/\s+/g, '-')}`);
      }
      
      // Generate pseudo-random code
      const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
      setGiftCode(`FLEET-GIFT-${randomString}`);
      
      // Reset timer
      setTimeLeft(24 * 60 * 60);
    }
  }, [isOpen, purchasedItems]);

  // Scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Timer Logic
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft]);

  // Format seconds into HH:MM:SS
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleCopyGiftLink = () => {
    const url = `https://openops.fleet/claim?code=${giftCode}`;
    navigator.clipboard.writeText(url);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `> ${msg}`]);
  };

  const startGithubFlow = () => {
    setGhState('connecting');
    // Simulate OAuth delay
    setTimeout(() => {
      setGhState('configuring');
    }, 1500);
  };

  const executePush = () => {
    setGhState('pushing');
    setLogs(['> Initializing Git environment...']);

    const sequence = [
      { msg: 'Authenticated as user via OAuth.', delay: 800 },
      { msg: `Creating repository '${repoName}' (${isPrivate ? 'Private' : 'Public'})...`, delay: 1500 },
      { msg: 'Repository created successfully.', delay: 2200 },
      { msg: 'Generating README.md with OpenOps Badge...', delay: 2800 },
      { msg: 'Unpacking agent artifacts...', delay: 3500 },
      { msg: 'git add .', delay: 4000 },
      { msg: 'git commit -m "feat: Initial deploy via OpenOps Fleet"', delay: 4500 },
      { msg: 'git push origin main', delay: 5500 },
      { msg: 'Verifying integrity...', delay: 6000 },
      { msg: 'Done.', delay: 6500 },
    ];

    sequence.forEach(({ msg, delay }) => {
      setTimeout(() => {
        addLog(msg);
        if (msg === 'Done.') setGhState('complete');
      }, delay);
    });
  };

  if (!isOpen) return null;

  const handleStartDownload = () => {
    if (isVerified) {
      console.log("Downloading assets...");
      onClose();
    } else {
      setStep('verification');
    }
  };

  const onVerificationComplete = () => {
    setIsVerified(true);
    // Return to previous step if it was github-export, else close
    if (step === 'github-export') {
       // stay here
    } else {
       setTimeout(() => { onClose(); }, 1000);
    }
  };

  const handleSocialShare = (platform: 'x' | 'linkedin') => {
    setIsSharing(true);
    const text = "Just acquired a new AI workforce from OpenOps Fleet. Deterministic agents are the future. 🚀 #OpenOps #AI";
    const url = "https://openops.fleet"; 
    let shareUrl = '';

    if (platform === 'x') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    } else {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');

    setTimeout(() => {
      setIsBonusUnlocked(true);
      setIsSharing(false);
    }, 2000);
  };

  const renderContent = () => {
    switch (step) {
      case 'success':
        return (
          <div className="text-center animate-fade-in pb-4">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icons.Check className="w-10 h-10 text-green-600 dark:text-green-500" />
            </div>
            <h2 className="text-3xl font-black text-black dark:text-white mb-2">Access Granted</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Your fleet source code has been secured.
            </p>

            {/* Actions */}
            <div className="space-y-3 mb-10">
              <button 
                onClick={() => setStep('platform')}
                className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-200 dark:shadow-brand-900/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
              >
                <Icons.Rocket className="w-5 h-5" />
                Start Deployment Concierge
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={handleStartDownload}
                  className="py-3 bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 text-black dark:text-white font-bold rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <Icons.FileCode className="w-4 h-4" />
                  Download ZIP
                </button>
                <button 
                  onClick={() => setStep('github-export')}
                  className="py-3 bg-gray-900 dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 text-white font-bold rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <Icons.SiGithub className="w-4 h-4" />
                  Push to Repo
                </button>
              </div>
            </div>

            {/* --- Viral Loop: Pay it Forward --- */}
            <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 to-purple-900 text-white shadow-xl transform transition-transform hover:scale-[1.01] border border-indigo-500/30">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Icons.Gift className="w-32 h-32 rotate-12" />
              </div>
              
              <div className="relative z-10 p-6 text-left">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      <Icons.Gift className="w-6 h-6 text-yellow-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">Pay-it-Forward License</h3>
                      <p className="text-indigo-200 text-xs">You have 1 invite remaining</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-white/10">
                    <Icons.Clock className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                    <span className="font-mono font-bold text-sm text-red-100">{formatTime(timeLeft)}</span>
                  </div>
                </div>

                <p className="text-sm text-indigo-100 mb-5 leading-relaxed">
                  As a new Fleet Commander, you can gift <strong>70% OFF</strong> this same agent to one friend or colleague. This link self-destructs in 24 hours.
                </p>

                <div className="flex gap-2">
                  <div className="flex-1 bg-black/40 rounded-lg border border-white/10 px-4 py-3 font-mono text-sm text-gray-300 truncate select-all">
                    https://openops.fleet/claim?code={giftCode}
                  </div>
                  <button 
                    onClick={handleCopyGiftLink}
                    className={`px-6 font-bold rounded-lg transition-all flex items-center gap-2 ${isLinkCopied ? 'bg-green-500 text-white' : 'bg-white text-indigo-900 hover:bg-indigo-50'}`}
                  >
                    {isLinkCopied ? <Icons.Check className="w-4 h-4" /> : <Icons.Copy className="w-4 h-4" />}
                    {isLinkCopied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
            {/* --- End Viral Loop --- */}

            {/* --- Secret Artifact Section --- */}
            <div className="relative overflow-hidden rounded-2xl border border-yellow-500/30 dark:border-yellow-500/20 bg-yellow-50/50 dark:bg-yellow-900/10 p-1">
              <div className="absolute top-0 right-0 px-3 py-1 bg-yellow-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-bl-xl z-20">
                Bonus Artifact
              </div>
              
              <div className="relative z-10 p-5 flex flex-col md:flex-row items-center gap-5">
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg text-white">
                  {isBonusUnlocked ? (
                    <Icons.FileText className="w-8 h-8 animate-fade-in" />
                  ) : (
                    <>
                      <Icons.FileText className="w-8 h-8 blur-[2px] opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl backdrop-blur-sm">
                        <Icons.Key className="w-6 h-6 text-white" />
                      </div>
                    </>
                  )}
                </div>

                <div className="text-left flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {isBonusUnlocked ? "Unlocked: 'Zero-To-One' Growth Tactics" : "Locked: Secret 'Zero-To-One' Tactics"}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {isBonusUnlocked 
                      ? "Advanced strategies to scale your agent fleet to 10k+ users. Ready for download." 
                      : "A restricted manifesto on how to scale this agent to 10k users. Share your purchase to unlock this file."}
                  </p>
                </div>

                <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
                  {isBonusUnlocked ? (
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-bold rounded-lg transition-all shadow-md active:scale-95 animate-fade-in">
                      <Icons.ArrowLeft className="w-3 h-3 rotate-[-90deg]" />
                      Download Bonus
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleSocialShare('x')}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <Icons.SiX className="w-3 h-3" />
                        Share
                      </button>
                      <button 
                        onClick={() => handleSocialShare('linkedin')}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-[#0077b5] text-white text-xs font-bold rounded-lg hover:bg-[#006396] transition-colors"
                      >
                        <Icons.SiLinkedin className="w-3 h-3" />
                        Share
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'github-export':
        return (
          <div className="animate-fade-in flex flex-col h-full text-left">
            <div className="flex items-center gap-3 mb-6 shrink-0">
              <div className="p-3 rounded-full bg-gray-900 text-white">
                <Icons.SiGithub className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white">Push to Repository</h3>
                <p className="text-xs text-gray-500">Developer Mode</p>
              </div>
            </div>

            {/* State Machine for GitHub Flow */}
            {ghState === 'idle' && (
              <div className="space-y-6 flex-1 overflow-y-auto scrollbar-hide">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                  <Icons.GitMerge className="w-4 h-4 inline mr-2" />
                  We will create a repository and push the unzipped artifacts directly to your account.
                </div>
                <button 
                  onClick={startGithubFlow}
                  className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                >
                  <Icons.SiGithub className="w-5 h-5" />
                  Connect GitHub Account
                </button>
                <div className="text-center">
                  <button onClick={() => setStep('success')} className="text-gray-400 hover:text-black dark:hover:text-white text-sm font-medium">Cancel</button>
                </div>
              </div>
            )}

            {ghState === 'connecting' && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-black dark:border-dark-700 dark:border-t-white rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-gray-500">Authorizing via OAuth...</p>
              </div>
            )}

            {ghState === 'configuring' && (
              <div className="space-y-6 flex-1 flex flex-col animate-fade-in">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Repository Name</label>
                  <input 
                    type="text" 
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 rounded-lg font-mono text-sm focus:border-black dark:focus:border-white outline-none"
                  />
                </div>
                
                <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-dark-800 rounded-lg">
                  <div className={`p-2 rounded ${isPrivate ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
                    <Icons.Lock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-black dark:text-white">Private Repository</h4>
                    <p className="text-xs text-gray-500">Only you can see this repo.</p>
                  </div>
                  <div 
                    onClick={() => setIsPrivate(!isPrivate)}
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${isPrivate ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isPrivate ? 'translate-x-6' : 'translate-x-0'}`} />
                  </div>
                </div>

                <div className="mt-auto">
                  <button 
                    onClick={executePush}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center justify-center gap-2"
                  >
                    <Icons.GitMerge className="w-5 h-5" />
                    Create & Push
                  </button>
                </div>
              </div>
            )}

            {(ghState === 'pushing' || ghState === 'complete') && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-green-400 overflow-y-auto scrollbar-hide flex-1 border border-slate-800 shadow-inner">
                  {logs.map((log, i) => (
                    <div key={i} className="mb-1">{log}</div>
                  ))}
                  <div ref={logsEndRef} />
                  {ghState === 'pushing' && (
                    <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1 align-middle"></span>
                  )}
                </div>
                
                {ghState === 'complete' && (
                  <div className="mt-6 animate-fade-in-up shrink-0">
                    <div className="flex items-center gap-2 mb-4 text-green-600 dark:text-green-500 font-bold justify-center">
                      <Icons.CheckCircle2 className="w-5 h-5" />
                      <span>Code Pushed Successfully</span>
                    </div>
                    <a 
                      href="#" 
                      target="_blank"
                      className="block w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl text-center hover:opacity-90 transition-opacity"
                    >
                      Open Repository <Icons.Link className="w-4 h-4 inline ml-1" />
                    </a>
                    <button 
                      onClick={onClose}
                      className="block w-full py-3 mt-3 text-gray-500 hover:text-black dark:hover:text-white font-medium text-sm transition-colors"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'verification':
        return (
          <div className="h-full overflow-y-auto scrollbar-hide">
            <DownloadVerificationGate 
                agent={purchasedItems[0]} 
                onVerified={onVerificationComplete}
                onCancel={() => setStep('success')}
            />
          </div>
        );

      case 'platform':
        return (
          <div className="animate-fade-in h-full flex flex-col">
            <div className="text-center mb-8 shrink-0">
              <h3 className="text-2xl font-bold text-black dark:text-white mb-2">Select Runtime Environment</h3>
              <p className="text-sm text-gray-500">We will generate specific installation steps for your target platform.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-8 overflow-y-auto scrollbar-hide flex-1">
              {[
                { id: 'Gemini', icon: Icons.Gemini, color: 'text-blue-500', bg: 'hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-200' },
                { id: 'ChatGPT', icon: Icons.ChatGPT, color: 'text-green-500', bg: 'hover:bg-green-50 dark:hover:bg-green-900/10 hover:border-green-200' },
                { id: 'Claude', icon: Icons.Claude, color: 'text-orange-500', bg: 'hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:border-orange-200' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setPlatform(p.id as Platform);
                    setStep('guide');
                  }}
                  className={`flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-900 transition-all text-left group ${p.bg}`}
                >
                  <div className={`p-3 rounded-lg bg-gray-100 dark:bg-dark-800 ${p.color}`}>
                    <p.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-black dark:text-white text-lg">{p.id}</div>
                    <div className="text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300">Click to generate guide</div>
                  </div>
                  <Icons.ChevronRight className="w-5 h-5 text-gray-300 ml-auto group-hover:text-black dark:group-hover:text-white" />
                </button>
              ))}
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-dark-800">
                <button onClick={() => setStep('success')} className="text-sm text-gray-400 hover:text-black dark:hover:text-white flex items-center justify-center gap-1 w-full">
                <Icons.ArrowLeft className="w-4 h-4" /> Back
                </button>
            </div>
          </div>
        );

      case 'guide':
        return (
          <div className="animate-fade-in text-left h-full flex flex-col">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-dark-800 pb-4 shrink-0">
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white flex items-center gap-2">
                  Deploying to {platform}
                </h3>
                <p className="text-xs text-gray-500">Follow these steps for {purchasedItems.length} agent(s)</p>
              </div>
              <div className="bg-brand-100 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 px-3 py-1 rounded-full text-xs font-bold font-mono">
                GUIDE-GEN-v1
              </div>
            </div>

            <div className="space-y-6 overflow-y-auto scrollbar-hide pr-2 flex-1">
              
              {/* Step 1: Download */}
              <div className="flex gap-4">
                <div className="flex-none flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">1</div>
                  <div className="w-0.5 h-full bg-gray-100 dark:bg-dark-800 my-1"></div>
                </div>
                <div className="pb-6">
                  <h4 className="font-bold text-sm text-black dark:text-white">Acquire Source Artifacts</h4>
                  <p className="text-xs text-gray-500 mb-3">Download the ZIP archive containing the raw source code.</p>
                  <button 
                    onClick={handleStartDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 rounded-lg text-xs font-bold transition-colors"
                  >
                    <Icons.FileCode className="w-4 h-4" /> 
                    {isVerified ? "Download .zip" : "Verify & Download .zip"}
                  </button>
                </div>
              </div>

              {/* Step 2: Portal */}
              <div className="flex gap-4">
                <div className="flex-none flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-800 text-gray-600 dark:text-gray-400 flex items-center justify-center font-bold text-sm">2</div>
                  <div className="w-0.5 h-full bg-gray-100 dark:bg-dark-800 my-1"></div>
                </div>
                <div className="pb-6">
                  <h4 className="font-bold text-sm text-black dark:text-white">Access Console</h4>
                  <p className="text-xs text-gray-500 mb-2">Open the developer console for {platform}.</p>
                  <a 
                    href={platform === 'Gemini' ? 'https://aistudio.google.com/' : platform === 'ChatGPT' ? 'https://chat.openai.com/gpts/editor' : 'https://claude.ai/projects'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-600 dark:text-brand-500 hover:underline text-xs flex items-center gap-1"
                  >
                    Open {platform === 'Gemini' ? 'Google AI Studio' : platform === 'ChatGPT' ? 'GPT Builder' : 'Claude Projects'} <Icons.Link className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Step 3: Specific Instructions */}
              <div className="flex gap-4">
                <div className="flex-none flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-800 text-gray-600 dark:text-gray-400 flex items-center justify-center font-bold text-sm">3</div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-black dark:text-white">Inject Logic</h4>
                  <p className="text-xs text-gray-500 mb-3">Locate these specific files in your extracted folder:</p>
                  
                  <div className="bg-gray-50 dark:bg-dark-950 p-3 rounded-lg border border-gray-100 dark:border-dark-800 text-xs font-mono space-y-2">
                    {platform === 'Gemini' && (
                      <>
                        <div className="flex items-center gap-2">
                          <Icons.FileText className="w-3 h-3 text-blue-500" />
                          <span className="text-gray-400">System Instructions:</span>
                          <span className="text-black dark:text-white">/instructions/gemini.txt</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icons.Code className="w-3 h-3 text-yellow-500" />
                          <span className="text-gray-400">Function Declarations:</span>
                          <span className="text-black dark:text-white">/tools.json</span>
                        </div>
                      </>
                    )}
                    {platform === 'ChatGPT' && (
                      <>
                        <div className="flex items-center gap-2">
                          <Icons.FileText className="w-3 h-3 text-green-500" />
                          <span className="text-gray-400">Instructions:</span>
                          <span className="text-black dark:text-white">/profile.md</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icons.BookOpen className="w-3 h-3 text-purple-500" />
                          <span className="text-gray-400">Knowledge:</span>
                          <span className="text-black dark:text-white">/knowledge/*.pdf</span>
                        </div>
                      </>
                    )}
                    {platform === 'Claude' && (
                      <>
                        <div className="flex items-center gap-2">
                          <Icons.FileText className="w-3 h-3 text-orange-500" />
                          <span className="text-gray-400">Project Instructions:</span>
                          <span className="text-black dark:text-white">/instructions/claude.txt</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icons.BookOpen className="w-3 h-3 text-purple-500" />
                          <span className="text-gray-400">Project Knowledge:</span>
                          <span className="text-black dark:text-white">/knowledge/</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-dark-800 flex gap-3 shrink-0">
              <button onClick={() => setStep('platform')} className="px-4 py-3 bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 text-black dark:text-white rounded-xl text-sm font-bold transition-colors">
                Back
              </button>
              <button onClick={onClose} className="flex-1 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity">
                Finish & Close
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-brand-900/90 dark:bg-black/90 backdrop-blur-md animate-fade-in" onClick={onClose} />
      
      {/* Widen to max-w-3xl, limit height to 85vh, hide overflow on container */}
      <div className="relative w-full max-w-3xl h-auto max-h-[85vh] bg-white dark:bg-dark-900 rounded-3xl shadow-2xl p-8 animate-fade-in-up border border-gray-100 dark:border-dark-800 overflow-hidden flex flex-col">
        {/* Progress Bar (Only for multi-step) */}
        {step !== 'success' && step !== 'verification' && step !== 'github-export' && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 dark:bg-dark-800">
            <div 
              className="h-full bg-brand-500 transition-all duration-500 ease-out" 
              style={{ width: step === 'platform' ? '50%' : '100%' }}
            ></div>
          </div>
        )}

        {/* Content Area with invisible scrollbar if needed */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};
