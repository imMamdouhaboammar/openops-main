
// tag: don't regression this feature
import React, { useState } from 'react';
import { Icons } from '../../Icons';
import { AgentProduct } from '../../../types';

interface CodeExplorerProps {
  agent: AgentProduct;
}

const MOCK_FILES = [
  { name: 'src', type: 'folder', children: [
      { name: 'agents', type: 'folder', children: [
          { name: 'core.ts', type: 'typescript', size: '12kb' },
          { name: 'tools.ts', type: 'typescript', size: '8kb' }
      ]},
      { name: 'config', type: 'folder', children: [
          { name: 'settings.json', type: 'json', size: '2kb' }
      ]},
      { name: 'index.ts', type: 'typescript', size: '1kb' }
  ]},
  { name: 'docs', type: 'folder', children: [
      { name: 'ARCHITECTURE.md', type: 'markdown', size: '5kb' },
      { name: 'SETUP.md', type: 'markdown', size: '3kb' }
  ]},
  { name: 'package.json', type: 'json', size: '1kb' },
  { name: '.env.example', type: 'env', size: '1kb' }
];

export const CodeExplorer: React.FC<CodeExplorerProps> = ({ agent }) => {
  const [activeFile, setActiveFile] = useState('core.ts');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['src', 'src/agents']);

  const toggleFolder = (path: string) => {
    if (expandedFolders.includes(path)) {
      setExpandedFolders(prev => prev.filter(p => p !== path));
    } else {
      setExpandedFolders(prev => [...prev, path]);
    }
  };

  const renderTree = (items: any[], parentPath = '') => {
    return items.map((item) => {
      const currentPath = `${parentPath}${item.name}`;
      const isExpanded = expandedFolders.includes(currentPath);
      const isActive = activeFile === item.name;

      if (item.type === 'folder') {
        return (
          <div key={currentPath}>
            <div 
              onClick={() => toggleFolder(currentPath)}
              className="flex items-center gap-2 px-4 py-1.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-800 text-xs text-gray-600 dark:text-gray-400 select-none transition-colors"
            >
              <Icons.ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              <Icons.Layout className="w-3.5 h-3.5 text-blue-500" />
              <span className="font-mono">{item.name}</span>
            </div>
            {isExpanded && <div className="border-l border-gray-200 dark:border-dark-700 ml-4">
              {renderTree(item.children, `${currentPath}/`)}
            </div>}
          </div>
        );
      }

      return (
        <div 
          key={currentPath}
          onClick={() => setActiveFile(item.name)}
          className={`flex items-center justify-between px-4 py-1.5 cursor-pointer text-xs select-none transition-colors border-l-2 ${
            isActive 
              ? 'bg-brand-50 dark:bg-brand-900/10 text-brand-600 dark:text-brand-400 border-brand-500' 
              : 'border-transparent hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-500 dark:text-gray-400'
          }`}
        >
          <div className="flex items-center gap-2">
            {item.type === 'typescript' && <Icons.Code className="w-3.5 h-3.5 text-blue-400" />}
            {item.type === 'json' && <Icons.FileJson className="w-3.5 h-3.5 text-yellow-400" />}
            {item.type === 'markdown' && <Icons.FileText className="w-3.5 h-3.5 text-gray-400" />}
            {item.type === 'env' && <Icons.Settings className="w-3.5 h-3.5 text-red-400" />}
            <span className="font-mono">{item.name}</span>
          </div>
          <span className="text-[10px] opacity-50">{item.size}</span>
        </div>
      );
    });
  };

  // Simulated code content with blurring
  const CodeLines = () => (
    <div className="space-y-1 font-mono text-xs leading-relaxed opacity-70">
       <div className="text-purple-500">import <span className="text-black dark:text-white">{`{ GoogleGenAI }`}</span> from <span className="text-green-600">"@google/genai"</span>;</div>
       <div className="text-gray-400">// Core agent logic implementation</div>
       <div className="flex gap-2">
          <span className="text-gray-400 select-none">1</span>
          <span className="text-blue-500">export class</span> <span className="text-yellow-500">{agent.name.replace(/\s/g, '')}</span> <span className="text-black dark:text-white">{`{`}</span>
       </div>
       {[...Array(15)].map((_, i) => (
         <div key={i} className="flex gap-2 group relative">
            <span className="text-gray-600 dark:text-gray-600 w-4 text-right select-none">{i + 2}</span>
            <div className={`h-3 rounded bg-gray-200 dark:bg-dark-700 w-${Math.floor(Math.random() * 60 + 20)}% blur-[2px] group-hover:blur-[1px] transition-all`}></div>
         </div>
       ))}
       <div className="flex gap-2">
          <span className="text-gray-400 select-none">18</span>
          <span className="text-black dark:text-white">{`}`}</span>
       </div>
    </div>
  );

  return (
    <div className="rounded-xl border border-gray-200 dark:border-dark-800 bg-white dark:bg-dark-900 overflow-hidden shadow-sm animate-fade-in">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-dark-800 bg-gray-50 dark:bg-dark-950">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
         </div>
         <div className="text-xs font-mono text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <Icons.Lock className="w-3 h-3" />
            <span>Read-Only Preview</span>
         </div>
      </div>

      <div className="flex flex-col md:flex-row h-[400px]">
        {/* Sidebar */}
        <div className="w-full md:w-64 border-r border-gray-200 dark:border-dark-800 overflow-y-auto bg-gray-50/50 dark:bg-dark-950/50 py-2">
           <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">Project Root</div>
           {renderTree(MOCK_FILES)}
        </div>

        {/* Code Area */}
        <div className="flex-1 bg-white dark:bg-[#1e1e1e] p-4 overflow-hidden relative">
           <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-purple-600"></div>
           <CodeLines />
           
           {/* CTA Overlay */}
           <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-[1px]">
              <div className="bg-white dark:bg-dark-900 p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-700 text-center max-w-xs transform hover:scale-105 transition-transform duration-300">
                 <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icons.Key className="w-6 h-6 text-brand-600 dark:text-brand-500" />
                 </div>
                 <h4 className="font-bold text-black dark:text-white mb-2">Source Locked</h4>
                 <p className="text-xs text-gray-500 mb-4">Purchase a license to unlock full source code access and documentation.</p>
                 <button className="px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-lg shadow-lg hover:bg-brand-700 transition-colors w-full">
                    Unlock Source (${agent.price})
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
