
import React, { useState, useMemo, useEffect } from 'react';
import { Icons } from './Icons';
import { CartItem } from '../types';
import { calculateFleetMultiplier, generateCheckoutIntelligence } from '../lib/engine';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onProcessPayment: () => void;
  isProcessing: boolean;
}

const ADDON_OFFER = {
  id: 'addon-keys-1',
  name: 'Universal API Key Manager Script',
  price: 9,
  description: 'Python script to securely rotate & inject keys into agents. Avoids hardcoding secrets.',
};

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cartItems, onProcessPayment, isProcessing }) => {
  const [step, setStep] = useState(1); // 1: Contact, 2: Payment
  const [isAddonSelected, setIsAddonSelected] = useState(false);
  
  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsAddonSelected(false);
    }
  }, [isOpen]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { savings } = calculateFleetMultiplier(cartItems);
  let total = subtotal - savings;

  if (isAddonSelected) {
    total += ADDON_OFFER.price;
  }

  const intelligence = useMemo(() => generateCheckoutIntelligence(cartItems), [cartItems]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Container: Max Height limited to 90vh, overflow hidden to contain inner scrolls */}
      <div className="relative w-full max-w-5xl h-auto max-h-[90vh] bg-white dark:bg-dark-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up border border-gray-200 dark:border-dark-800">
        
        {/* Left Side: Fleet Intelligence Report */}
        {/* Added overflow-y-auto and scrollbar-hide to allow scrolling if content gets too tall */}
        <div className="hidden md:flex w-2/5 bg-slate-900 dark:bg-black border-r border-gray-200 dark:border-dark-800 flex-col text-white h-full">
          <div className="p-8 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-brand-500 rounded-lg">
                <Icons.Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Fleet Intelligence</h3>
                <p className="text-xs text-gray-500">Operational Impact Report</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide px-8 pb-4 space-y-8">
            {/* Capabilities */}
            <div>
              <h4 className="text-xs font-bold text-brand-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Icons.Zap className="w-4 h-4" /> Capabilities Acquired
              </h4>
              <ul className="space-y-3">
                {intelligence.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <Icons.Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risks */}
            <div>
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Icons.ShieldCheck className="w-4 h-4" /> Risks Mitigated
              </h4>
              <ul className="space-y-3">
                {intelligence.risksReduced.map((risk, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <Icons.Shield className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strategy */}
            <div>
              <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Icons.TrendingUp className="w-4 h-4" /> Strategic Edge
              </h4>
              <ul className="space-y-3">
                {intelligence.strategicGains.map((gain, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <Icons.Award className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                    <span>{gain}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pricing Footer - Fixed at bottom of left panel */}
          <div className="mt-auto p-8 pt-6 border-t border-gray-800 bg-slate-900 dark:bg-black z-10">
            <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
              <span>Fleet Value</span>
              <span className="line-through">${subtotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white font-bold">Investment</span>
              <div className="text-right">
                <span className="text-2xl font-mono font-bold text-brand-500">${total.toFixed(2)}</span>
                {savings > 0 && <div className="text-[10px] text-green-400">Saved ${savings.toFixed(2)}</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Checkout Form */}
        <div className="flex-1 flex flex-col h-full bg-white dark:bg-dark-900">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100 dark:border-dark-800 shrink-0">
            <h2 className="text-2xl font-bold text-black dark:text-white">Secure Checkout</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-black dark:hover:text-white">
              <Icons.X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide p-6 md:p-8">
            
            {/* Mobile Order Summary (Visible only on mobile) */}
            <div className="md:hidden mb-6 p-4 bg-gray-50 dark:bg-dark-950 rounded-xl border border-gray-200 dark:border-dark-800">
              <div className="flex justify-between items-center font-bold text-black dark:text-white">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{cartItems.length} Agents Included</p>
            </div>

            {/* Steps Indicator */}
            <div className="flex items-center gap-2 mb-8">
              <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-brand-500' : 'bg-gray-200 dark:bg-dark-800'}`} />
              <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-brand-500' : 'bg-gray-200 dark:bg-dark-800'}`} />
            </div>

            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
                  <input type="email" placeholder="you@company.com" className="w-full p-3 bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 rounded-lg focus:border-brand-500 outline-none transition-colors dark:text-white" />
                  <p className="text-[10px] text-gray-400 mt-1">We'll send the source code download link here.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">First Name</label>
                    <input type="text" className="w-full p-3 bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 rounded-lg focus:border-brand-500 outline-none transition-colors dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Last Name</label>
                    <input type="text" className="w-full p-3 bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 rounded-lg focus:border-brand-500 outline-none transition-colors dark:text-white" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-4 bg-brand-50/50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/20 rounded-lg flex items-center gap-3">
                  <Icons.Shield className="w-5 h-5 text-brand-600 dark:text-brand-500" />
                  <span className="text-xs text-brand-800 dark:text-brand-200 font-medium">Transactions are secure and encrypted.</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Card Number</label>
                    <div className="relative">
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 pl-12 bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 rounded-lg focus:border-brand-500 outline-none transition-colors font-mono dark:text-white" />
                      <div className="absolute left-3 top-3.5">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-4 bg-red-500/80 rounded"></div>
                          <div className="w-6 h-4 bg-yellow-500/80 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Expiry Date</label>
                      <input type="text" placeholder="MM / YY" className="w-full p-3 bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 rounded-lg focus:border-brand-500 outline-none transition-colors font-mono dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">CVC</label>
                      <input type="text" placeholder="123" className="w-full p-3 bg-gray-50 dark:bg-dark-950 border border-gray-200 dark:border-dark-800 rounded-lg focus:border-brand-500 outline-none transition-colors font-mono dark:text-white" />
                    </div>
                  </div>
                </div>

                {/* --- Order Bump (Revenue Hack) --- */}
                <div className="p-1 rounded-xl bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20">
                  <div className="bg-white dark:bg-dark-900 rounded-lg p-3 border border-yellow-200 dark:border-yellow-900/50">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <div className="relative flex items-center mt-1">
                        <input 
                          type="checkbox" 
                          checked={isAddonSelected}
                          onChange={(e) => setIsAddonSelected(e.target.checked)}
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-slate-300 dark:border-slate-600 checked:bg-brand-500 checked:border-brand-500 transition-all"
                        />
                        <Icons.Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                            <Icons.Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                            Recommended Add-on
                          </span>
                          <span className="font-mono font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-2 py-0.5 rounded text-xs">
                            +${ADDON_OFFER.price}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-0.5">{ADDON_OFFER.name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
                          {ADDON_OFFER.description}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer (Sticky at bottom of form) */}
          <div className="p-6 md:p-8 border-t border-gray-100 dark:border-dark-800 bg-white dark:bg-dark-900 mt-auto shrink-0">
            {step === 1 && (
              <button onClick={() => setStep(2)} className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg">
                Continue to Payment
              </button>
            )}
            
            {step === 2 && (
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-3 border border-gray-200 dark:border-dark-800 text-gray-600 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors">
                  Back
                </button>
                <button 
                  onClick={onProcessPayment}
                  disabled={isProcessing}
                  className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-200 dark:shadow-brand-500/20 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>Pay ${total.toFixed(2)}</>
                  )}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
