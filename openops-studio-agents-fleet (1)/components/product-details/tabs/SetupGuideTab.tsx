
import React, { useState } from 'react';
import { AgentProduct } from '../../../types';
import { Icons } from '../../Icons';

interface SetupGuideTabProps {
  agent: AgentProduct;
}

export const SetupGuideTab: React.FC<SetupGuideTabProps> = ({ agent }) => {
  const [selectedPlatform, setSelectedPlatform] = useState(agent.compatiblePlatforms[0] || 'Gemini');

  const renderSetupGuide = () => {
     switch (selectedPlatform) {
      case 'Gemini':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex gap-4">
              <div className="flex-none pt-1"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-bold">1</span></div>
              <div>
                <h4 className="font-bold text-black dark:text-white">Access Google AI Studio</h4>
                <p className="text-sm text-gray-500 mt-1">Navigate to <a href="#" className="text-blue-500 hover:underline">aistudio.google.com</a> and create a new prompt.</p>
              </div>
            </div>
             <div className="flex gap-4">
              <div className="flex-none pt-1"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-bold">2</span></div>
              <div>
                <h4 className="font-bold text-black dark:text-white">Import System Instructions</h4>
                <p className="text-sm text-gray-500 mt-1">Copy <code>instructions/gemini.txt</code> into the "System Instructions" block.</p>
              </div>
            </div>
          </div>
        );
      case 'ChatGPT':
        return (
           <div className="space-y-6 animate-fade-in">
            <div className="flex gap-4">
              <div className="flex-none pt-1"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 text-xs font-bold">1</span></div>
              <div>
                <h4 className="font-bold text-black dark:text-white">Create a New GPT</h4>
                <p className="text-sm text-gray-500 mt-1">Go to "My GPTs" -> "Create". Navigate to "Configure".</p>
              </div>
            </div>
             <div className="flex gap-4">
              <div className="flex-none pt-1"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 text-xs font-bold">2</span></div>
              <div>
                <h4 className="font-bold text-black dark:text-white">Upload Knowledge</h4>
                <p className="text-sm text-gray-500 mt-1">Upload <code>knowledge/*.pdf</code> files to the Knowledge section.</p>
              </div>
            </div>
          </div>
        );
      case 'Claude':
        return (
           <div className="space-y-6 animate-fade-in">
            <div className="flex gap-4">
              <div className="flex-none pt-1"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 text-xs font-bold">1</span></div>
              <div>
                <h4 className="font-bold text-black dark:text-white">Create Project</h4>
                <p className="text-sm text-gray-500 mt-1">Create a new Project in Claude for this agent context.</p>
              </div>
            </div>
             <div className="flex gap-4">
              <div className="flex-none pt-1"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 text-xs font-bold">2</span></div>
              <div>
                <h4 className="font-bold text-black dark:text-white">Add Project Instructions</h4>
                <p className="text-sm text-gray-500 mt-1">Paste content from <code>instructions/claude.txt</code>.</p>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="animate-fade-in">
       <div className="mb-8">
         <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Select Target Platform</label>
         <div className="flex gap-4">
           {agent.compatiblePlatforms.map(platform => (
             <button
               key={platform}
               onClick={() => setSelectedPlatform(platform)}
               className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                 selectedPlatform === platform 
                 ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 shadow-sm' 
                 : 'border-gray-200 dark:border-dark-800 hover:bg-gray-50 dark:hover:bg-dark-900'
               }`}
             >
               {platform === 'Gemini' && <Icons.Gemini className={`w-5 h-5 ${selectedPlatform === platform ? 'text-brand-500' : 'text-gray-400'}`} />}
               {platform === 'ChatGPT' && <Icons.ChatGPT className={`w-5 h-5 ${selectedPlatform === platform ? 'text-brand-500' : 'text-gray-400'}`} />}
               {platform === 'Claude' && <Icons.Claude className={`w-5 h-5 ${selectedPlatform === platform ? 'text-brand-500' : 'text-gray-400'}`} />}
               <span className="font-bold text-sm">{platform}</span>
             </button>
           ))}
         </div>
       </div>
       
       <div className="bg-white dark:bg-dark-900 border border-gray-100 dark:border-dark-800 rounded-2xl p-8 shadow-sm">
          {renderSetupGuide()}
       </div>
    </div>
  );
};
