
import React, { useState } from 'react';
import { Icons } from './Icons';
import { useUser } from '../hooks/useUser';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (page: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onNavigate, isDark, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useUser();

  const handleMobileNav = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-dark-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo Area */}
            <div className="flex items-center cursor-pointer z-50 group" onClick={() => onNavigate('home')}>
              <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center mr-3 transition-transform group-hover:scale-105 shadow-lg shadow-brand-500/20">
                <Icons.Terminal className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-lg font-bold text-black dark:text-white tracking-tight leading-none">OpenOps</span>
                <span className="block text-[10px] text-gray-500 dark:text-gray-400 font-mono tracking-[0.2em] uppercase mt-0.5">Agents Fleet</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <button onClick={() => onNavigate('home')} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-500 transition-colors">Catalog</button>
                <button onClick={() => onNavigate('licenses')} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-500 transition-colors">Command Center</button>
                <button onClick={() => onNavigate('docs')} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-500 transition-colors">Docs</button>
                <button 
                  onClick={() => onNavigate('stack')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-dark-800 text-black dark:text-white rounded-lg text-sm font-bold hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 transition-all"
                >
                  <Icons.Layers className="w-4 h-4" />
                  Build Stack
                </button>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
               
               {/* Account Center / Auth Button */}
               {isAuthenticated && user ? (
                 <button 
                   onClick={() => onNavigate('account')}
                   className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-transparent hover:bg-gray-50 dark:hover:bg-dark-800 transition-all group"
                 >
                   <div className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-700 dark:text-brand-400 text-xs font-bold">
                     {user.name.charAt(0)}
                   </div>
                   <span className="text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">{user.name}</span>
                 </button>
               ) : (
                 <button 
                   onClick={() => onNavigate('login')}
                   className="text-xs font-bold text-black dark:text-white hover:text-brand-500 transition-colors px-3"
                 >
                   Sign In
                 </button>
               )}

               <div className="h-6 w-px bg-gray-200 dark:bg-dark-800 mx-1"></div>

               <button 
                  onClick={toggleTheme}
                  className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-900 rounded-full transition-colors"
               >
                  {isDark ? <Icons.Sun className="w-5 h-5" /> : <Icons.Moon className="w-5 h-5" />}
               </button>

               <button 
                  onClick={onOpenCart}
                  className="relative p-2.5 group"
               >
                  <Icons.ShoppingCart className="w-6 h-6 text-black dark:text-white group-hover:text-brand-500 transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-brand-500 rounded-full border-2 border-white dark:border-black">
                      {cartCount}
                    </span>
                  )}
               </button>
            </div>

            {/* Mobile Actions & Menu Toggle */}
            <div className="flex md:hidden items-center gap-4">
              <button 
                  onClick={onOpenCart}
                  className="relative p-2"
              >
                  <Icons.ShoppingCart className="w-6 h-6 text-black dark:text-white" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-brand-500 rounded-full">
                      {cartCount}
                    </span>
                  )}
              </button>
              
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-black dark:text-white z-50 focus:outline-none"
              >
                {isMobileMenuOpen ? <Icons.X className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Full Screen Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-white dark:bg-black transition-all duration-300 ease-in-out md:hidden flex flex-col pt-28 px-6 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-8">
          <div className="space-y-6">
            <h3 className="text-xs font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest">Explore</h3>
            <button onClick={() => handleMobileNav('home')} className="block w-full text-left text-4xl font-extrabold text-black dark:text-white hover:text-brand-500 transition-colors tracking-tight">Catalog</button>
            
            {isAuthenticated ? (
              <>
                <button onClick={() => handleMobileNav('account')} className="block w-full text-left text-4xl font-extrabold text-brand-600 dark:text-brand-500 hover:text-brand-700 transition-colors tracking-tight">Account Center</button>
                <button onClick={() => handleMobileNav('licenses')} className="block w-full text-left text-4xl font-extrabold text-black dark:text-white hover:text-brand-500 transition-colors tracking-tight">Command Center</button>
              </>
            ) : (
              <button onClick={() => handleMobileNav('login')} className="block w-full text-left text-4xl font-extrabold text-brand-600 dark:text-brand-500 hover:text-brand-700 transition-colors tracking-tight">Sign In / Join</button>
            )}
            
            <button onClick={() => handleMobileNav('stack')} className="block w-full text-left text-4xl font-extrabold text-black dark:text-white hover:text-brand-500 transition-colors tracking-tight">Build Stack</button>
            <button onClick={() => handleMobileNav('docs')} className="block w-full text-left text-4xl font-extrabold text-black dark:text-white hover:text-brand-500 transition-colors tracking-tight">Docs</button>
          </div>

          <div className="h-px bg-gray-100 dark:bg-dark-900 w-full" />

          <div className="space-y-6">
            <h3 className="text-xs font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest">Preferences</h3>
            <button 
              onClick={toggleTheme}
              className="flex items-center justify-between w-full p-6 bg-gray-50 dark:bg-dark-900 rounded-2xl border border-gray-100 dark:border-dark-800"
            >
              <span className="text-lg font-bold text-black dark:text-white">Theme</span>
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <span className="text-sm">{isDark ? 'Dark' : 'Light'}</span>
                {isDark ? <Icons.Moon className="w-5 h-5" /> : <Icons.Sun className="w-5 h-5" />}
              </div>
            </button>
            
            {isAuthenticated && (
              <button 
                onClick={() => { logout(); handleMobileNav('home'); }}
                className="w-full text-left text-red-500 font-bold"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
