
import React, { useState } from 'react';
import { Icons } from './Icons';
import { AgentProduct, CartItem } from '../types';
import { CartInspector } from './CartInspector';
import { SmartBundle } from './SmartBundle';
import { calculateFleetMultiplier, checkCompatibility, TierData } from '../lib/engine';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  onAddToCart: (agent: AgentProduct) => void;
  targetPlatform: string;
  onSelectPlatform: (platform: string) => void;
}

// Internal Component: Tier Progress Bar
const TierProgressBar: React.FC<{ tierData: TierData }> = ({ tierData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isEnterprise = tierData.current === 'Enterprise';
  
  return (
    <div className={`border-b border-slate-200 dark:border-dark-800 transition-colors ${
      isEnterprise ? 'bg-gradient-to-r from-yellow-50 to-brand-50 dark:from-yellow-900/10 dark:to-brand-900/10' : 'bg-white dark:bg-dark-900'
    }`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 focus:outline-none"
      >
        <div className="text-left">
          <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
            isEnterprise ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500'
          }`}>
            {isEnterprise ? <Icons.Award className="w-4 h-4" /> : <Icons.TrendingUp className="w-4 h-4" />}
            {isEnterprise ? 'Enterprise Status Unlocked' : 'Fleet Status'}
          </h4>
          <div className="text-lg font-black text-slate-900 dark:text-white mt-1">
            {tierData.current} Tier
          </div>
        </div>
        <div className="flex items-center gap-4">
           {!isEnterprise && (
            <div className="text-right hidden sm:block">
                <div className="text-[10px] text-slate-400 font-mono mb-1">Next Level</div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {tierData.next}
                </div>
            </div>
           )}
           <Icons.ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 animate-fade-in">
          {/* Progress Track */}
          <div className="relative h-2 w-full bg-slate-100 dark:bg-dark-800 rounded-full overflow-hidden mb-3">
            <div 
              className={`absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out ${
                isEnterprise ? 'bg-gradient-to-r from-yellow-400 to-brand-500 w-full' : 'bg-brand-500'
              }`}
              style={{ width: `${tierData.progress}%` }}
            />
            {/* Pulse effect for unfinished bars */}
            {!isEnterprise && (
              <div className="absolute top-0 left-0 h-full w-full bg-white/30 animate-[pulse_2s_infinite]" style={{ width: `${tierData.progress}%` }}></div>
            )}
          </div>

          {/* Motivation Message */}
          <div className="flex items-center gap-2 text-xs">
            {isEnterprise ? (
              <span className="flex items-center gap-2 text-brand-700 dark:text-brand-400 font-bold animate-fade-in">
                <Icons.CheckCircle2 className="w-4 h-4" />
                20% Discount + Secret PDFs Unlocked!
              </span>
            ) : (
              <span className="text-slate-500 dark:text-slate-400">
                Add <span className="font-bold text-black dark:text-white">{tierData.agentsNeeded}</span> more to unlock <span className="font-bold text-brand-600 dark:text-brand-400">{tierData.perkLabel}</span>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem, 
  onCheckout, 
  onAddToCart,
  targetPlatform,
  onSelectPlatform
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Calculate Multiplier Logic (Internal Secret)
  const { savings, tierData } = calculateFleetMultiplier(cartItems);
  const total = subtotal - savings;

  return (
    <div className={`fixed inset-0 z-[60] overflow-hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-slate-900/50 dark:bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      
      <div className={`fixed inset-y-0 right-0 max-w-md w-full bg-white dark:bg-dark-900 border-l border-slate-200 dark:border-dark-800 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-dark-800 shrink-0">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Icons.Terminal className="w-5 h-5 text-brand-600 dark:text-brand-500" />
            Fleet Manifest
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <Icons.X className="w-6 h-6" />
          </button>
        </div>

        {/* Target Runtime Selector */}
        <div className="bg-gray-50 dark:bg-dark-950 p-4 border-b border-slate-200 dark:border-dark-800">
           <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Target Runtime Environment</label>
           <div className="flex gap-2">
             {['All', 'Gemini', 'ChatGPT', 'Claude'].map(p => (
               <button
                 key={p}
                 onClick={() => onSelectPlatform(p)}
                 className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                   targetPlatform === p 
                   ? 'bg-brand-500 text-white shadow-md' 
                   : 'bg-white dark:bg-dark-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-dark-700 hover:border-brand-500'
                 }`}
               >
                 {p}
               </button>
             ))}
           </div>
        </div>

        {/* Tier Progress Bar (Gamification Layer) */}
        {cartItems.length > 0 && tierData && (
          <TierProgressBar tierData={tierData} />
        )}

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          
          {/* Inspector (Only if items exist) */}
          {cartItems.length > 0 && <CartInspector items={cartItems} />}

          {/* Smart Bundle Recommendations (System Logic Up-sell) */}
          {cartItems.length > 0 && <SmartBundle currentItems={cartItems} onAdd={onAddToCart} />}

          <div className="p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 py-12">
                <Icons.Cpu className="w-16 h-16 mb-4 opacity-20" />
                <p>Your fleet is empty.</p>
                <button onClick={onClose} className="mt-4 text-brand-600 dark:text-brand-500 hover:underline">Browse Agents</button>
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Active Units</h4>
                {cartItems.map((item) => {
                  const isCompatible = checkCompatibility(item, targetPlatform);
                  
                  return (
                    <div key={item.id} className={`flex gap-4 p-4 rounded-lg border transition-all group relative ${
                      isCompatible 
                      ? 'bg-slate-50 dark:bg-dark-800 border-slate-200 dark:border-dark-700 hover:border-brand-200 dark:hover:border-brand-900/50' 
                      : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30'
                    }`}>
                      <div className="w-12 h-12 rounded bg-white dark:bg-dark-950 border border-slate-200 dark:border-none flex items-center justify-center shrink-0">
                        {isCompatible ? <Icons.Terminal className="w-6 h-6 text-brand-600 dark:text-brand-500" /> : <Icons.AlertTriangle className="w-6 h-6 text-red-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</h4>
                          <button onClick={() => onRemoveItem(item.id)} className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Icons.X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">{item.role}</p>
                        
                        {!isCompatible && (
                          <div className="mt-2 text-[10px] text-red-600 dark:text-red-400 font-bold bg-red-100 dark:bg-red-900/20 px-2 py-1 rounded inline-block">
                            Not configured for {targetPlatform}
                          </div>
                        )}

                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-[10px] bg-white dark:bg-dark-700 border border-slate-200 dark:border-transparent px-2 py-0.5 rounded text-slate-600 dark:text-slate-300 font-mono">x{item.quantity}</span>
                          <span className="font-mono text-brand-600 dark:text-brand-400 font-bold text-sm">${item.price}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-dark-800 bg-slate-50 dark:bg-dark-950 transition-colors shrink-0">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-slate-600 dark:text-slate-400 text-sm">
              <span>Subtotal</span>
              <span className="font-mono text-slate-900 dark:text-white">${subtotal}</span>
            </div>

            {/* Discount Display (Hidden Logic) */}
            {savings > 0 && (
              <div className="flex justify-between items-center text-green-600 dark:text-green-400 font-medium text-sm animate-fade-in">
                <div className="flex items-center gap-2">
                  <Icons.Sparkles className="w-4 h-4" />
                  <span>System Discount Applied</span>
                </div>
                <span className="font-mono">-${savings.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-dark-800">
              <span className="text-slate-900 dark:text-white font-bold text-lg">Total</span>
              <span className="font-mono text-brand-600 dark:text-brand-500 font-bold text-2xl">${total.toFixed(2)}</span>
            </div>
          </div>

          <button 
            disabled={cartItems.length === 0}
            onClick={onCheckout}
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 dark:hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors shadow-lg shadow-brand-200 dark:shadow-none flex items-center justify-center gap-2"
          >
            <Icons.Code className="w-4 h-4" />
            Compile & Checkout
          </button>
          <p className="text-center text-[10px] text-slate-500 dark:text-slate-600 mt-3 font-mono">
            Encrypted Transaction • Instant Source Delivery
          </p>
        </div>
      </div>
    </div>
  );
};
