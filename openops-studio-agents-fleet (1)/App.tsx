
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Store } from './components/Store';
import { Manifesto } from './components/Manifesto';
import { ProductPage } from './components/ProductPage';
import { Documentation } from './components/Documentation';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { SmartToast } from './components/SmartToast';
import { LiveTicker } from './components/LiveTicker'; 
import { MyStackBuilder } from './components/MyStackBuilder'; 
import { LicenseManager } from './components/LicenseManager';
import { AccountCenter } from './components/AccountCenter'; 
import { AuthPage } from './components/AuthPage'; // Import AuthPage
import { useTheme } from './hooks/useTheme';
import { useShopController } from './hooks/useShopController';

function App() {
  const { isDark, toggleTheme } = useTheme();
  
  const {
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
    setCurrentView, // Needs to be exposed from hook
    
    // Actions
    scrollToStore,
    handleNavigate,
    handleViewProduct,
    addToCart,
    removeFromCart,
    handleOpenCheckout,
    handleProcessPayment
  } = useShopController();

  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans text-black dark:text-white transition-colors duration-300">
      
      {/* Hide Navbar on Auth Pages for immersive feel */}
      {currentView !== 'login' && currentView !== 'signup' && (
        <Navbar 
          cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)} 
          onOpenCart={() => setIsCartOpen(true)}
          onNavigate={handleNavigate}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />
      )}
      
      <main>
        {currentView === 'home' && (
          <>
            <Hero onExplore={scrollToStore} onViewDocs={() => handleNavigate('docs')} />
            <Store onViewProduct={handleViewProduct} onAddToCart={addToCart} />
          </>
        )}

        {currentView === 'about' && (
          <Manifesto onExplore={() => {
            handleNavigate('home');
            setTimeout(scrollToStore, 100);
          }} />
        )}

        {currentView === 'docs' && (
          <Documentation onBack={() => handleNavigate('home')} />
        )}

        {currentView === 'stack' && (
          <MyStackBuilder 
            onBack={() => handleNavigate('home')}
            onAddToCart={addToCart}
            setToast={setToast}
          />
        )}

        {currentView === 'licenses' && (
          <LicenseManager 
            onBack={() => handleNavigate('home')}
          />
        )}

        {currentView === 'account' && (
          <AccountCenter 
            onBack={() => handleNavigate('home')}
          />
        )}

        {currentView === 'product' && selectedAgent && (
          <ProductPage 
            agent={selectedAgent} 
            onBack={() => handleNavigate('home')} 
            onAddToCart={addToCart}
            onView={handleViewProduct}
          />
        )}

        {/* Auth Routes */}
        {(currentView === 'login' || currentView === 'signup') && (
          <AuthPage 
            initialMode={currentView as 'login' | 'signup'}
            onSuccess={() => handleNavigate('home')}
            setToast={setToast}
          />
        )}
      </main>

      {currentView !== 'login' && currentView !== 'signup' && <Footer />}

      {/* --- Overlays & Modals --- */}
      
      <LiveTicker />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onCheckout={handleOpenCheckout}
        onAddToCart={addToCart}
        targetPlatform={targetPlatform}
        onSelectPlatform={setTargetPlatform}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onProcessPayment={handleProcessPayment}
        isProcessing={isProcessingPayment}
      />

      <OrderSuccessModal 
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        purchasedItems={lastPurchasedItems}
      />

      <SmartToast 
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

export default App;
