import { useState, useEffect } from 'react';
import { AgentProduct, CartItem } from '../types';
import { ToastMessage } from '../components/SmartToast';
import { analyzeBundleLogic, getNormalizedId, checkCompatibility } from '../lib/engine';

export const useShopController = () => {
  // --- State ---
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentProduct | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [targetPlatform, setTargetPlatform] = useState<string>('All');
  
  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [lastPurchasedItems, setLastPurchasedItems] = useState<CartItem[]>([]);

  // Routing state - Added 'account', 'login', 'signup'
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'product' | 'docs' | 'stack' | 'licenses' | 'account' | 'login' | 'signup'>('home');

  // --- Logic ---

  // Scroll Helper
  const scrollToStore = () => {
    const el = document.getElementById('fleet');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Navigation Helper
  const handleNavigate = (page: string) => {
    if (['home', 'about', 'docs', 'stack', 'licenses', 'account', 'login', 'signup'].includes(page)) {
      setCurrentView(page as any);
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };

  const handleViewProduct = (agent: AgentProduct) => {
    setSelectedAgent(agent);
    setCurrentView('product');
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  // Cart Helper: Add extra license to existing item
  const forceAddLicense = (agent: AgentProduct) => {
    setCartItems(prev => prev.map(item => getNormalizedId(item) === getNormalizedId(agent) ? { ...item, quantity: item.quantity + 1 } : item));
    setToast({
      id: Date.now().toString(),
      title: 'License Seat Added',
      description: `Added +1 seat for ${agent.name}.`,
      type: 'success'
    });
  };

  // Cart Helper: Add item separate from bundle
  const forceAddNewItem = (agent: AgentProduct) => {
    setCartItems(prev => [...prev, { ...agent, quantity: 1 }]);
    setIsCartOpen(true);
    setToast({
      id: Date.now().toString(),
      title: 'Extra License Added',
      description: `Added a separate license for ${agent.name}.`,
      type: 'success'
    });
  };

  // Core Cart Logic
  const addToCart = (agent: AgentProduct, bypassCheck = false) => {
    // 0. Platform Check (The Gate)
    if (!bypassCheck && !checkCompatibility(agent, targetPlatform)) {
      setToast({
        id: Date.now().toString(),
        title: 'Platform Incompatibility',
        description: `This agent is not configured for ${targetPlatform} currently.`,
        type: 'warning',
        actions: [
          {
            label: 'Add Anyway',
            onClick: () => addToCart(agent, true),
            variant: 'secondary'
          },
          {
            label: 'Cancel',
            onClick: () => {}, 
            variant: 'primary'
          }
        ]
      });
      return;
    }

    // 1. Priority Check: Does this specific item ALREADY exist as a standalone item?
    const exists = cartItems.find(item => getNormalizedId(item) === getNormalizedId(agent));

    if (exists) {
      setToast({
        id: Date.now().toString(),
        title: 'Agent Already in Fleet',
        description: `You already have ${agent.name} in your manifest. Would you like to add an additional license seat?`,
        type: 'warning',
        actions: [
          {
            label: 'Add Extra License (+1)',
            onClick: () => forceAddLicense(agent),
            variant: 'primary'
          },
          {
            label: 'Keep Single',
            onClick: () => {}, // Just dismiss
            variant: 'secondary'
          }
        ]
      });
      return;
    }

    // 2. Analyze Bundle Logic
    const bundleLogic = analyzeBundleLogic(cartItems, agent);

    if (bundleLogic.action === 'ALREADY_OWNED_IN_BUNDLE') {
      setToast({
        id: Date.now().toString(),
        title: 'Already in Your Fleet',
        description: `You already own '${agent.name}' as part of the '${bundleLogic.bundleName}' bundle.`,
        type: 'info',
        actions: [
          {
            label: 'Buy Separate License',
            onClick: () => forceAddNewItem(agent),
            variant: 'primary'
          },
          {
            label: 'Use Bundle Version',
            onClick: () => {}, 
            variant: 'secondary'
          }
        ]
      });
      return;
    }

    if (bundleLogic.action === 'REPLACE_INDIVIDUALS') {
      // Remove individual items, then add the bundle
      setCartItems(prev => {
        const filtered = prev.filter(item => !bundleLogic.itemsToRemove?.includes(item.id));
        return [...filtered, { ...agent, quantity: 1 }];
      });
      
      setToast({
        id: Date.now().toString(),
        title: 'Cart Automatically Optimized',
        description: `Removed individual agents (${bundleLogic.replacedNames?.join(', ')}) because they are included in this bundle. You saved money!`,
        type: 'success'
      });
      setIsCartOpen(true);
      return;
    }

    // Normal Add
    setCartItems(prev => [...prev, { ...agent, quantity: 1 }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Checkout Logic
  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsCheckoutOpen(false);
      setLastPurchasedItems([...cartItems]);
      setCartItems([]); // Clear cart
      setIsSuccessOpen(true);
    }, 2000);
  };

  // Prevent background scroll when modals are open
  useEffect(() => {
    if (isCartOpen || isCheckoutOpen || isSuccessOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isCartOpen, isCheckoutOpen, isSuccessOpen]);

  return {
    // State
    cartItems,
    isCartOpen,
    setIsCartOpen,
    selectedAgent,
    toast,
    setToast,
    targetPlatform,
    setTargetPlatform,
    isCheckoutOpen,
    setIsCheckoutOpen,
    isProcessingPayment,
    isSuccessOpen,
    setIsSuccessOpen,
    lastPurchasedItems,
    currentView,
    setCurrentView,
    
    // Actions
    scrollToStore,
    handleNavigate,
    handleViewProduct,
    addToCart,
    removeFromCart,
    handleOpenCheckout,
    handleProcessPayment
  };
};
