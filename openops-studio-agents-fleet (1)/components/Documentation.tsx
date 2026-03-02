
import React, { useState } from 'react';
import { Icons } from './Icons';

interface DocumentationProps {
  onBack: () => void;
}

export const Documentation: React.FC<DocumentationProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: Icons.Zap },
    { id: 'file-structure', title: 'Package Structure', icon: Icons.Layout },
    { id: 'gemini-integration', title: 'Gemini Gems', icon: Icons.Gemini },
    { id: 'chatgpt-integration', title: 'ChatGPT Custom GPTs', icon: Icons.ChatGPT },
    { id: 'claude-integration', title: 'Claude Projects', icon: Icons.Claude },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: Icons.HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 border-b border-gray-100 dark:border-dark-900 pb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white mb-6 transition-colors group"
          >
            <div className="p-1 rounded-full bg-gray-100 dark:bg-dark-900 group-hover:bg-brand-500 group-hover:text-white transition-colors">
              <Icons.ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-medium">Back to Fleet</span>
          </button>
          <h1 className="text-4xl font-black text-black dark:text-white tracking-tight mb-4">
            Documentation
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl">
            Everything you need to know about deploying OpenOps Agents to your preferred AI platform.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                    activeSection === section.id
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-900'
                  }`}
                >
                  <section.icon className={`w-4 h-4 ${activeSection === section.id ? 'text-white' : ''}`} />
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-16 pb-20">
            
            {/* Getting Started */}
            <section id="getting-started" className="scroll-mt-32">
              <h2 className="text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                  <Icons.Zap className="w-6 h-6" />
                </div>
                Getting Started
              </h2>
              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4">
                <p>
                  Welcome to the OpenOps ecosystem. Unlike standard prompting, our agents are delivered as <strong>Source Code Packages</strong>. This gives you full control over the logic, tools, and persona of your AI workforce.
                </p>
                <p>
                  When you purchase an agent, you receive a <code>.zip</code> file. This archive contains the "DNA" of the agent, formatted to be platform-agnostic but easily importable into Gemini, ChatGPT, or Claude.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-blue-700 dark:text-blue-300 text-sm font-medium m-0">
                    <strong>Note:</strong> You do not need to be a developer to use these files. The integration process is mostly copy-and-paste.
                  </p>
                </div>
              </div>
            </section>

            {/* File Structure */}
            <section id="file-structure" className="scroll-mt-32 border-t border-gray-100 dark:border-dark-900 pt-10">
              <h2 className="text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <Icons.Layout className="w-6 h-6" />
                </div>
                Package Structure
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Every OpenOps Agent package follows the <strong>Standard Agent Protocol (SAP)</strong> directory structure:
              </p>
              
              <div className="bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 rounded-xl p-6 overflow-hidden">
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex items-center gap-3">
                    <Icons.FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-black dark:text-white font-bold">profile.md</span>
                    <span className="text-gray-400 ml-auto">The agent's persona, voice, and constraints.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icons.Settings className="w-4 h-4 text-orange-500" />
                    <span className="text-black dark:text-white font-bold">instructions/</span>
                    <span className="text-gray-400 ml-auto">Platform-specific system prompts.</span>
                  </div>
                  <div className="ml-8 flex items-center gap-3 text-gray-500">
                    <Icons.FileText className="w-3 h-3" />
                    <span>gemini.txt</span>
                  </div>
                  <div className="ml-8 flex items-center gap-3 text-gray-500">
                    <Icons.FileText className="w-3 h-3" />
                    <span>claude.txt</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icons.FileJson className="w-4 h-4 text-yellow-500" />
                    <span className="text-black dark:text-white font-bold">tools.json</span>
                    <span className="text-gray-400 ml-auto">Function calling definitions (OpenAPI spec).</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icons.Code className="w-4 h-4 text-green-500" />
                    <span className="text-black dark:text-white font-bold">logic.pseudo</span>
                    <span className="text-gray-400 ml-auto">Chain-of-thought reasoning steps.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icons.BookOpen className="w-4 h-4 text-brand-500" />
                    <span className="text-black dark:text-white font-bold">knowledge/</span>
                    <span className="text-gray-400 ml-auto">Reference documents (PDF/MD) for RAG.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Gemini Integration */}
            <section id="gemini-integration" className="scroll-mt-32 border-t border-gray-100 dark:border-dark-900 pt-10">
              <h2 className="text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Icons.Gemini className="w-6 h-6" />
                </div>
                Gemini Gems Integration
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-none pt-1"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-dark-800 text-xs font-bold">1</span></div>
                  <div>
                    <h4 className="font-bold text-black dark:text-white">Open Google AI Studio</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Go to <a href="#" className="text-brand-500 hover:underline">aistudio.google.com</a> and click "Create New".</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-none pt-1"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-dark-800 text-xs font-bold">2</span></div>
                  <div>
                    <h4 className="font-bold text-black dark:text-white">System Instructions</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      Open <code>instructions/gemini.txt</code> from your download. Copy the entire text and paste it into the "System Instructions" block in AI Studio.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-none pt-1"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-dark-800 text-xs font-bold">3</span></div>
                  <div>
                    <h4 className="font-bold text-black dark:text-white">Function Declarations (Tools)</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      If your agent has tools, copy the content of <code>tools.json</code>. In AI Studio, scroll to "Function Declarations" and paste the JSON array.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ChatGPT Integration */}
            <section id="chatgpt-integration" className="scroll-mt-32 border-t border-gray-100 dark:border-dark-900 pt-10">
              <h2 className="text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <Icons.ChatGPT className="w-6 h-6" />
                </div>
                ChatGPT Custom GPTs
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-none pt-1"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-dark-800 text-xs font-bold">1</span></div>
                  <div>
                    <h4 className="font-bold text-black dark:text-white">Create a GPT</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Go to "Explore GPTs" -> "Create". Select the "Configure" tab.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-none pt-1"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-dark-800 text-xs font-bold">2</span></div>
                  <div>
                    <h4 className="font-bold text-black dark:text-white">Instructions & Knowledge</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      Paste the contents of <code>profile.md</code> into the "Instructions" box. Then, upload any files found in the <code>knowledge/</code> folder to "Knowledge".
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Claude Integration */}
            <section id="claude-integration" className="scroll-mt-32 border-t border-gray-100 dark:border-dark-900 pt-10">
              <h2 className="text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                  <Icons.Claude className="w-6 h-6" />
                </div>
                Claude Projects
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-none pt-1"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-dark-800 text-xs font-bold">1</span></div>
                  <div>
                    <h4 className="font-bold text-black dark:text-white">Create Project</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">In Claude, start a new Project. This allows you to ground the model with specific context.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-none pt-1"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-dark-800 text-xs font-bold">2</span></div>
                  <div>
                    <h4 className="font-bold text-black dark:text-white">Project Knowledge</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      Upload <code>capabilities.md</code> and <code>logic.pseudo</code> to the Project Knowledge. This helps Claude understand the agent's functional boundaries.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-none pt-1"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-dark-800 text-xs font-bold">3</span></div>
                  <div>
                    <h4 className="font-bold text-black dark:text-white">Custom Instructions</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      Set custom instructions for the project using the content from <code>instructions/claude.txt</code>.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting" className="scroll-mt-32 border-t border-gray-100 dark:border-dark-900 pt-10">
              <h2 className="text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                  <Icons.HelpCircle className="w-6 h-6" />
                </div>
                Troubleshooting
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-dark-950 p-6 rounded-xl border border-gray-200 dark:border-dark-800">
                  <h4 className="font-bold text-black dark:text-white mb-2">Agent refuses to use tools?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ensure <code>tools.json</code> is correctly pasted in the function calling section. Verify the model setting is set to "Auto" for function calling.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-dark-950 p-6 rounded-xl border border-gray-200 dark:border-dark-800">
                  <h4 className="font-bold text-black dark:text-white mb-2">Response is too generic?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Check if you uploaded the <code>profile.md</code> or <code>instructions/</code> text correctly. The agent needs this system prompt to adopt its persona.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};
