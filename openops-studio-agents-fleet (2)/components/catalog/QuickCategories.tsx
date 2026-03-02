
// tag: don't regression this feature
import React from 'react';
import { Icons } from '../Icons';
import { AgentCategory } from '../../types';

interface QuickCategoriesProps {
  activeCategories: string[];
  onToggleCategory: (category: string) => void;
}

export const QuickCategories: React.FC<QuickCategoriesProps> = ({ activeCategories, onToggleCategory }) => {
  const categories = [
    { id: AgentCategory.STRATEGIC, icon: Icons.Briefcase, label: 'Strategic' },
    { id: AgentCategory.ENGINEERING, icon: Icons.Code, label: 'Engineering' },
    { id: AgentCategory.CREATIVE, icon: Icons.MessageSquare, label: 'Creative' },
    { id: AgentCategory.REGIONAL, icon: Icons.Globe, label: 'MENA Regional' },
    { id: AgentCategory.OPERATIONS, icon: Icons.Shield, label: 'Operations' },
    { id: AgentCategory.BUNDLE, icon: Icons.Layers, label: 'Fleet Bundles' },
  ];

  return (
    <div className="mb-12">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-1">Quick Filter</h3>
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat) => {
          const isActive = activeCategories.includes(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => onToggleCategory(cat.id)}
              className={`
                flex items-center gap-2 px-5 py-3 rounded-xl border font-bold text-sm whitespace-nowrap transition-all
                ${isActive 
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-lg' 
                  : 'bg-white dark:bg-dark-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-dark-800 hover:border-brand-500 dark:hover:border-brand-500 hover:text-brand-500'}
              `}
            >
              <cat.icon className={`w-4 h-4 ${isActive ? '' : 'opacity-70'}`} />
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};