
// tag: don't regression this feature
import React from 'react';
import { Icons } from '../Icons';

interface CategoryTabsProps {
  activeCategory: string;
  onSelect: (category: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onSelect }) => {
  const categories = [
    { id: 'All', label: 'Latest Feed', icon: Icons.Layout },
    { id: 'Blueprint', label: 'Engineering Blueprints', icon: Icons.Code },
    { id: 'Intel', label: 'Strategic Intel', icon: Icons.Briefcase },
    { id: 'Case Study', label: 'Case Studies', icon: Icons.Award },
    { id: 'Regional (MENA)', label: 'MENA Insights', icon: Icons.Globe },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-gray-100 dark:border-dark-800">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all
              ${isActive 
                ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg scale-105' 
                : 'bg-white dark:bg-dark-900 text-gray-500 hover:text-black dark:hover:text-white border border-gray-200 dark:border-dark-700 hover:border-gray-300'}
            `}
          >
            <cat.icon className={`w-4 h-4 ${isActive ? '' : 'opacity-70'}`} />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};
