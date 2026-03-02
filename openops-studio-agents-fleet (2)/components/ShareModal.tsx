
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { AgentProduct } from '../types';
import { Icons } from './Icons';

interface ShareModalProps {
  agent: AgentProduct;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ agent, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Mock URL generation logic - in a real app this would use the actual router path
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}?agent=${agent.id}`
    : `https://openops.dev/agent/${agent.id}`;

  const shareText = `Check out ${agent.name} on OpenOps Fleet!`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white dark:bg-dark-900 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-dark-800 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-black dark:text-white">Share Agent</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black dark:hover:text-white">
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        {/* Copy Link Section */}
        <div className="mb-6">
          <p className="text-xs font-bold text-gray-500 uppercase mb-2">Agent Link</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-400 truncate font-mono select-all">
              {shareUrl}
            </div>
            <button
              onClick={handleCopy}
              className={`px-3 py-2 rounded-lg font-bold text-sm transition-all flex items-center justify-center min-w-[3rem] ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-black dark:bg-white text-white dark:text-black hover:opacity-90'
              }`}
            >
              {copied ? <Icons.Check className="w-4 h-4" /> : <Icons.Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Social Share Grid */}
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase mb-3">Share via</p>
          <div className="grid grid-cols-3 gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 hover:border-black dark:hover:border-white transition-colors group"
            >
              <Icons.SiX className="w-5 h-5 text-black dark:text-white" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white">X</span>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 hover:border-[#0077b5] transition-colors group"
            >
              <Icons.SiLinkedin className="w-5 h-5 text-[#0077b5]" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-[#0077b5]">LinkedIn</span>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 hover:border-[#1877F2] transition-colors group"
            >
              <Icons.SiFacebook className="w-5 h-5 text-[#1877F2]" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-[#1877F2]">Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
