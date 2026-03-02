
// tag: don't regression this feature
import React, { useState } from 'react';
import { Icons } from '../Icons';

interface CodeBlockProps {
  language: string;
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-8 rounded-xl overflow-hidden bg-[#1e1e1e] border border-gray-800 shadow-2xl group">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
          <span className="text-xs font-mono text-gray-400 ml-2 uppercase tracking-wider">{language || 'CODE'}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Icons.Check className="w-4 h-4 text-green-500" /> : <Icons.Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="font-mono text-sm leading-relaxed text-gray-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
