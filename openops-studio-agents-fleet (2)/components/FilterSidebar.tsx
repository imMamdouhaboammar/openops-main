
import React from 'react';
import { AgentCategory, LicenseTier, SearchFilters } from '../types';
import { Icons } from './Icons';

interface FilterSidebarProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  className?: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onChange, className = '' }) => {
  
  const toggleCategory = (cat: string) => {
    const newCats = filters.category.includes(cat)
      ? filters.category.filter(c => c !== cat)
      : [...filters.category, cat];
    onChange({ ...filters, category: newCats });
  };

  const togglePlatform = (plat: string) => {
    const newPlats = filters.platforms.includes(plat)
      ? filters.platforms.filter(p => p !== plat)
      : [...filters.platforms, plat];
    onChange({ ...filters, platforms: newPlats });
  };

  const toggleLicenseTier = (tier: string) => {
    const safeTiers = filters.licenseTiers || [];
    const newTiers = safeTiers.includes(tier)
      ? safeTiers.filter(t => t !== tier)
      : [...safeTiers, tier];
    onChange({ ...filters, licenseTiers: newTiers });
  };

  return (
    <div className={`space-y-8 ${className}`}>
      
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-bold text-black dark:text-white uppercase tracking-wider mb-4">Category</h3>
        <div className="space-y-2">
          {Object.values(AgentCategory).map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                filters.category.includes(cat) 
                  ? 'bg-brand-500 border-brand-500 text-white' 
                  : 'border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 group-hover:border-brand-500'
              }`}>
                {filters.category.includes(cat) && <Icons.Check className="w-3 h-3" />}
              </div>
              <span className={`text-sm ${filters.category.includes(cat) ? 'text-black dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-sm font-bold text-black dark:text-white uppercase tracking-wider mb-4">Price Range</h3>
        <div className="flex items-center gap-3 mb-4">
           <div className="relative flex-1">
             <span className="absolute left-3 top-2 text-gray-400 text-xs">$</span>
             <input 
               type="number" 
               value={filters.minPrice} 
               onChange={(e) => onChange({...filters, minPrice: Number(e.target.value)})}
               className="w-full bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-lg py-1.5 pl-6 pr-2 text-sm text-black dark:text-white focus:border-brand-500 outline-none"
             />
           </div>
           <span className="text-gray-400">-</span>
           <div className="relative flex-1">
             <span className="absolute left-3 top-2 text-gray-400 text-xs">$</span>
             <input 
               type="number" 
               value={filters.maxPrice} 
               onChange={(e) => onChange({...filters, maxPrice: Number(e.target.value)})}
               className="w-full bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-lg py-1.5 pl-6 pr-2 text-sm text-black dark:text-white focus:border-brand-500 outline-none"
             />
           </div>
        </div>
        <input 
          type="range" 
          min="0" 
          max="300" 
          value={filters.maxPrice}
          onChange={(e) => onChange({...filters, maxPrice: Number(e.target.value)})}
          className="w-full h-1 bg-gray-200 dark:bg-dark-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
        />
      </div>

      {/* Platform Filter */}
      <div>
        <h3 className="text-sm font-bold text-black dark:text-white uppercase tracking-wider mb-4">Platform</h3>
        <div className="space-y-2">
          {['Gemini', 'ChatGPT', 'Claude'].map(plat => (
            <label key={plat} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                filters.platforms.includes(plat) 
                  ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black' 
                  : 'border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 group-hover:border-gray-400'
              }`}>
                {filters.platforms.includes(plat) && <Icons.Check className="w-3 h-3" />}
              </div>
              <span className={`text-sm ${filters.platforms.includes(plat) ? 'text-black dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                {plat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* License Tier Filter */}
      <div>
        <h3 className="text-sm font-bold text-black dark:text-white uppercase tracking-wider mb-4">License Tier</h3>
        <div className="space-y-2">
          {Object.values(LicenseTier).map(tier => (
            <label key={tier} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                (filters.licenseTiers || []).includes(tier) 
                  ? 'bg-brand-500 border-brand-500 text-white' 
                  : 'border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 group-hover:border-brand-500'
              }`}>
                {(filters.licenseTiers || []).includes(tier) && <Icons.Check className="w-3 h-3" />}
              </div>
              <span className={`text-sm ${(filters.licenseTiers || []).includes(tier) ? 'text-black dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                {tier}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="text-sm font-bold text-black dark:text-white uppercase tracking-wider mb-4">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2].map(rating => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="rating" 
                className="hidden"
                checked={filters.minRating === rating}
                onChange={() => onChange({ ...filters, minRating: rating })}
              />
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                filters.minRating === rating 
                  ? 'border-brand-500' 
                  : 'border-gray-300 dark:border-dark-700 group-hover:border-brand-500'
              }`}>
                {filters.minRating === rating && <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />}
              </div>
              <span className={`text-sm flex items-center gap-1 ${filters.minRating === rating ? 'text-black dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                {rating}+ <Icons.Star className="w-3 h-3 fill-current text-yellow-400" />
              </span>
            </label>
          ))}
          <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="rating" 
                className="hidden"
                checked={filters.minRating === null}
                onChange={() => onChange({ ...filters, minRating: null })}
              />
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                filters.minRating === null 
                  ? 'border-brand-500' 
                  : 'border-gray-300 dark:border-dark-700 group-hover:border-brand-500'
              }`}>
                {filters.minRating === null && <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />}
              </div>
              <span className={`text-sm ${filters.minRating === null ? 'text-black dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                Any Rating
              </span>
            </label>
        </div>
      </div>

      {/* Clear Filters */}
      <button 
        onClick={() => onChange({ category: [], platforms: [], licenseTiers: [], minPrice: 0, maxPrice: 300, minRating: null })}
        className="text-xs text-gray-500 hover:text-brand-500 underline decoration-dotted transition-colors"
      >
        Clear all filters
      </button>

    </div>
  );
};
