
import React, { useEffect } from 'react';
import { Icons } from './Icons';

interface ToastAction {
  label: string;
  onClick: () => void;
  variant: 'primary' | 'secondary';
}

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'success';
  actions?: ToastAction[];
}

interface SmartToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const SmartToast: React.FC<SmartToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast && !toast.actions) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-fade-in-up max-w-md w-full">
      <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl shadow-2xl p-5 flex flex-col gap-3 relative overflow-hidden">
        
        {/* Accent Bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${
          toast.type === 'success' ? 'bg-green-500' : 
          toast.type === 'warning' ? 'bg-yellow-500' : 'bg-brand-500'
        }`} />

        <div className="flex justify-between items-start pl-2">
          <div className="flex gap-3">
            <div className={`mt-0.5 ${
               toast.type === 'success' ? 'text-green-500' : 
               toast.type === 'warning' ? 'text-yellow-500' : 'text-brand-500'
            }`}>
              {toast.type === 'success' ? <Icons.CheckCircle2 className="w-5 h-5" /> : 
               toast.type === 'warning' ? <Icons.AlertTriangle className="w-5 h-5" /> : 
               <Icons.Terminal className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="font-bold text-black dark:text-white text-sm">{toast.title}</h4>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 leading-relaxed">
                {toast.description}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            <Icons.X className="w-4 h-4" />
          </button>
        </div>

        {toast.actions && (
          <div className="flex gap-3 pl-10 mt-1">
            {toast.actions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => {
                  action.onClick();
                  onClose();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  action.variant === 'primary'
                    ? 'bg-brand-500 text-white hover:bg-brand-600 shadow-md shadow-brand-500/20'
                    : 'bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
