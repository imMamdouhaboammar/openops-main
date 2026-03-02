
import React, { useState, useEffect, useRef } from 'react';
import { AgentProduct } from '../types';
import { Icons } from './Icons';

interface Message {
  id: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  timestamp: number;
}

interface EvaluationSandboxProps {
  agent: AgentProduct;
}

export const EvaluationSandbox: React.FC<EvaluationSandboxProps> = ({ agent }) => {
  // State
  const [usageCount, setUsageCount] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Persistence Key to prevent refresh exploit (simulating server-side persistence)
  const STORAGE_KEY = `openops_sandbox_${agent.id}`;

  // Load state on mount
  useEffect(() => {
    const savedUsage = localStorage.getItem(`${STORAGE_KEY}_usage`);
    const savedMessages = localStorage.getItem(`${STORAGE_KEY}_messages`);
    
    if (savedUsage) setUsageCount(parseInt(savedUsage, 10));
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, [agent.id]);

  // Persist state updates
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_usage`, usageCount.toString());
    localStorage.setItem(`${STORAGE_KEY}_messages`, JSON.stringify(messages));
  }, [usageCount, messages, agent.id]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);

  // Determine State Machine Status
  const getStatus = () => {
    if (usageCount >= 10) return 'EXHAUSTED';
    if (usageCount >= 8) return 'WARNING';
    if (usageCount > 0) return 'ACTIVE';
    return 'INITIALIZED';
  };

  const status = getStatus();

  // Handlers
  const handleSendMessage = async () => {
    // A. Gatekeeper Check
    if (!inputValue.trim() || usageCount >= 10 || isProcessing) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: Date.now()
    };

    // F. Usage Accounting (Input)
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setUsageCount(prev => prev + 1); // +1 for User Input
    setIsProcessing(true);

    // Check immediate exhaustion after input
    if (usageCount + 1 >= 10) {
      setIsProcessing(false);
      return;
    }

    // Simulate Network/Processing Delay
    setTimeout(() => {
      // 2. Generate Agent Response (Output)
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: generateMockResponse(agent, userMsg.content),
        timestamp: Date.now()
      };

      // F. Usage Accounting (Output)
      setMessages(prev => [...prev, agentMsg]);
      setUsageCount(prev => prev + 1); // +1 for Agent Output
      setIsProcessing(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Mock Logic for "Real Code" simulation (since no backend exists)
  const generateMockResponse = (agent: AgentProduct, input: string): string => {
    return `[System: Executing ${agent.name} v1.0 logic]\n\nProcessed input: "${input.substring(0, 30)}${input.length > 30 ? '...' : ''}"\n\nBased on configuration as ${agent.role}, executing chain-of-thought:\n> Context retrieved: 0 records\n> Constraints checked: PASS\n\nResponse generated based on ${agent.filesIncluded[0]?.name || 'spec.md'}.`;
  };

  // Render Helpers
  const renderStatusBar = () => {
    const remaining = 10 - usageCount;
    let bgColor = 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300';
    let label = 'Evaluation Mode: Active';
    let indicatorColor = 'bg-green-500';
    
    if (status === 'WARNING') {
      bgColor = 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300';
      label = 'Evaluation Mode: Limited';
      indicatorColor = 'bg-amber-500';
    } else if (status === 'EXHAUSTED') {
      bgColor = 'bg-gray-100 dark:bg-dark-800 border-gray-200 dark:border-dark-700 text-gray-500 dark:text-gray-400';
      label = 'Evaluation Mode: Concluded';
      indicatorColor = 'bg-gray-400';
    } else if (status === 'INITIALIZED') {
       label = 'Evaluation Mode: Ready';
    }

    return (
      <div className={`flex items-center justify-between px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border-b ${bgColor}`}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status !== 'EXHAUSTED' ? 'animate-pulse' : ''} ${indicatorColor}`} />
          {label}
        </div>
        <div>
          {remaining} messages remaining
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[500px] bg-white dark:bg-dark-950 border border-gray-200 dark:border-dark-800 rounded-xl overflow-hidden shadow-sm transition-colors">
      {/* 1. Status Bar */}
      {renderStatusBar()}

      {/* 2. Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 opacity-50">
            <Icons.Terminal className="w-12 h-12 mb-2" />
            <p>Initializing Sandbox Environment...</p>
            <p className="text-xs">System Prompt Loaded. Tools Loaded.</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-lg border ${
              msg.role === 'user' 
                ? 'bg-white dark:bg-dark-900 border-gray-200 dark:border-dark-800 text-gray-800 dark:text-gray-200' 
                : 'bg-gray-50 dark:bg-dark-900 border-brand-200 dark:border-brand-900/30 text-brand-900 dark:text-brand-100'
            }`}>
              <div className="text-[10px] opacity-50 mb-1 uppercase">{msg.role === 'agent' ? 'OpenOps Agent' : 'User'}</div>
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}

        {isProcessing && (
           <div className="flex flex-col items-start animate-pulse">
             <div className="max-w-[85%] p-3 rounded-lg border bg-gray-50 dark:bg-dark-900 border-gray-200 dark:border-dark-800">
               <div className="flex gap-1">
                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
               </div>
             </div>
           </div>
        )}

        {/* Inline Warning Message */}
        {(status === 'WARNING' && !isProcessing) && (
           <div className="flex justify-center my-4">
             <span className="text-[10px] bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-2 py-1 rounded border border-amber-100 dark:border-amber-900/30">
               Evaluation limit approaching. {10 - usageCount} messages remaining.
             </span>
           </div>
        )}
      </div>

      {/* 3. Input Area OR Locked State Component */}
      {status === 'EXHAUSTED' ? (
        <div className="p-6 bg-gray-50 dark:bg-dark-900 border-t border-gray-200 dark:border-dark-800">
          <div className="flex items-center gap-2 mb-2 text-black dark:text-white">
             <Icons.Lock className="w-4 h-4" />
             <h4 className="text-sm font-bold">Evaluation Session Concluded</h4>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
            The interaction limit for this agent specification has been reached. 
            This session demonstrated the agent's logic routing and persona constraints based on the current source version.
            No session data has been retained.
          </p>
          <button className="text-xs font-bold text-brand-600 dark:text-brand-500 hover:underline flex items-center gap-1">
            <Icons.FileText className="w-3 h-3" /> View Technical Documentation
          </button>
        </div>
      ) : (
        <div className="p-3 bg-white dark:bg-dark-950 border-t border-gray-200 dark:border-dark-800">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command to evaluate logic..."
              className="w-full bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-lg py-2.5 pl-4 pr-10 text-sm font-mono text-black dark:text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
              disabled={isProcessing}
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isProcessing}
              className="absolute right-2 top-2 p-1 text-gray-400 hover:text-brand-500 disabled:opacity-30 transition-colors"
            >
              <Icons.ArrowLeft className="w-4 h-4 rotate-90" />
            </button>
          </div>
          <div className="text-[10px] text-gray-400 dark:text-gray-600 mt-2 flex justify-between px-1">
             <span className="font-mono">Running: {agent.filesIncluded[0]?.name || 'system_prompt.md'}</span>
             <span>Strict Evaluation Environment</span>
          </div>
        </div>
      )}
    </div>
  );
};
