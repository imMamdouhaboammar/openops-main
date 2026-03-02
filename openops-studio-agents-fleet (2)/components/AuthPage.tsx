
import React, { useState } from 'react';
import { Icons } from './Icons';
import { useUser } from '../hooks/useUser';
import { ToastMessage } from './SmartToast';

interface AuthPageProps {
  onSuccess: () => void;
  setToast: (toast: ToastMessage | null) => void;
  initialMode?: 'login' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess, setToast, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const { login, signup, isLoading } = useUser();
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isVendor, setIsVendor] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validation State
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    if (!email.includes('@') || !email.includes('.')) newErrors.email = "Invalid email address.";
    if (password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    if (mode === 'signup' && !name) newErrors.name = "Full name is required.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length > 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // Max 4
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (mode === 'login') {
        await login(email);
        setToast({ id: 'login-success', title: 'Welcome Back', description: 'Access granted to Fleet Command.', type: 'success' });
      } else {
        await signup({
          name,
          email,
          roles: isVendor ? ['Buyer', 'Vendor'] : ['Buyer']
        });
        setToast({ id: 'signup-success', title: 'Account Created', description: 'Welcome to OpenOps. Your journey begins.', type: 'success' });
      }
      onSuccess();
    } catch (error) {
      setToast({ id: 'auth-error', title: 'Authentication Failed', description: 'Please check your credentials.', type: 'warning' });
    }
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white dark:bg-dark-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-gray-200 dark:border-dark-800 animate-fade-in-up">
        
        {/* Left Side: Brand & Marketing */}
        <div className="md:w-5/12 bg-slate-900 dark:bg-black p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
             <div className="absolute top-[-20%] right-[-20%] w-[400px] h-[400px] bg-brand-500 rounded-full blur-[100px]" />
             <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-500 rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center">
                <Icons.Terminal className="h-5 w-5" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">OpenOps</span>
            </div>
            
            <h2 className="text-3xl font-black text-white leading-tight mb-6">
              {mode === 'login' ? 'Return to Command.' : 'Deploy Intelligence.'}
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {mode === 'login' 
                ? 'Access your fleet, manage licenses, and monitor agent performance from a centralized dashboard.' 
                : 'Join the marketplace for enterprise-grade AI agents. Stop prompting blindly. Start engineering.'}
            </p>
          </div>

          <div className="relative z-10 mt-12 space-y-4">
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Icons.ShieldCheck className="w-4 h-4 text-green-400" />
              </div>
              <span>SOC2 Compliant Security</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Icons.Users className="w-4 h-4 text-brand-400" />
              </div>
              <span>Join 10,000+ Operators</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-dark-900">
          <div className="max-w-md mx-auto w-full">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </h3>
            <p className="text-gray-500 text-sm mb-8">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setErrors({});
                }} 
                className="text-brand-600 font-bold hover:underline"
              >
                {mode === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {mode === 'signup' && (
                <div className="animate-fade-in">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                  <div className="relative">
                    <Icons.Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Connor"
                      className={`w-full bg-gray-50 dark:bg-dark-950 border rounded-xl py-3 pl-10 pr-4 text-black dark:text-white outline-none focus:border-brand-500 transition-colors ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-dark-800'}`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                <div className="relative">
                  <Icons.MessageSquare className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className={`w-full bg-gray-50 dark:bg-dark-950 border rounded-xl py-3 pl-10 pr-4 text-black dark:text-white outline-none focus:border-brand-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-dark-800'}`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
                <div className="relative">
                  <Icons.Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full bg-gray-50 dark:bg-dark-950 border rounded-xl py-3 pl-10 pr-12 text-black dark:text-white outline-none focus:border-brand-500 transition-colors ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-dark-800'}`}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-brand-500"
                  >
                    {showPassword ? <Icons.AlertTriangle className="w-5 h-5" /> : <Icons.HelpCircle className="w-5 h-5" />} 
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                
                {/* Password Strength Meter */}
                {mode === 'signup' && password && (
                  <div className="mt-2 flex gap-1 h-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`flex-1 rounded-full transition-all duration-300 ${i <= strength ? (strength < 2 ? 'bg-red-500' : strength < 3 ? 'bg-yellow-500' : 'bg-green-500') : 'bg-gray-200 dark:bg-dark-800'}`} />
                    ))}
                  </div>
                )}
              </div>

              {mode === 'signup' && (
                <div className="flex items-center gap-3 p-4 bg-brand-50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/20 rounded-xl cursor-pointer" onClick={() => setIsVendor(!isVendor)}>
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isVendor ? 'bg-brand-500 border-brand-500' : 'bg-white border-gray-300'}`}>
                    {isVendor && <Icons.Check className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-black dark:text-white">Register as a Vendor</h4>
                    <p className="text-xs text-gray-500">I want to sell my own agents on the Fleet.</p>
                  </div>
                </div>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold text-lg rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {mode === 'login' ? 'Sign In' : 'Create Account'} <Icons.ArrowLeft className="w-5 h-5 rotate-180" />
                  </>
                )}
              </button>

            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-dark-800 text-center">
              <p className="text-xs text-gray-400">
                By continuing, you agree to OpenOps' <a href="#" className="underline hover:text-brand-500">Terms of Service</a> and <a href="#" className="underline hover:text-brand-500">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
