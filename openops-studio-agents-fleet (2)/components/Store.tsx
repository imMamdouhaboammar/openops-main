
import React, { useState, useEffect } from 'react';
import { AgentProduct, SearchFilters, AgentCategory } from '../types';
import { api } from '../lib/api';
import { AgentCard } from './AgentCard';
import { Icons } from './Icons';
import { FilterSidebar } from './FilterSidebar';
import { collections } from '../lib/collectionsData';

// New Modular Components
import { Hero } from './catalog/Hero';
import { QuickCategories } from './catalog/QuickCategories';
import { FeaturedBundle } from './catalog/FeaturedBundle';
import { TrustSignals } from './catalog/TrustSignals';
import { NewsletterBox } from './catalog/NewsletterBox';
import { CollectionsRail } from './catalog/collections/CollectionsRail';
import { CompareBar } from './catalog/compare/CompareBar';
import { CompareModal } from './catalog/compare/CompareModal';

interface StoreProps {
  onViewProduct: (agent: AgentProduct) => void;
  onAddToCart: (agent: AgentProduct) => void;
}

const ITEMS_PER_PAGE = 9; 

export const Store: React.FC<StoreProps> = ({ onViewProduct, onAddToCart }) => {
  const [filteredAgents, setFilteredAgents] = useState<AgentProduct[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  
  // Compare State
  const [compareList, setCompareList] = useState<AgentProduct[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const [filters, setFilters] = useState<SearchFilters>({
    category: [],
    platforms: [],
    licenseTiers: [],
    minPrice: 0,
    maxPrice: 300,
    minRating: null
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // If a collection is active, we override filters partially to match collection IDs
      let results = await api.getFilteredAgents(filters, sort);
      
      // Collection Filter Logic
      if (activeCollectionId) {
        const collection = collections.find(c => c.id === activeCollectionId);
        if (collection) {
           // We filter the RESULTS to only include agents in the collection
           results = results.filter(a => collection.filterIds.includes(a.id));
        }
      }

      const finalResults = searchQuery 
        ? results.filter(a => 
            a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            a.role.toLowerCase().includes(searchQuery.toLowerCase())
          ) 
        : results;

      setFilteredAgents(finalResults);
      setCurrentPage(1);
      setIsLoading(false);
    };

    fetchData();
  }, [filters, sort, searchQuery, activeCollectionId]);

  const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAgents = filteredAgents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const grid = document.getElementById('catalog-grid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCategoryToggle = (category: string) => {
    const newCats = filters.category.includes(category) 
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category];
    setFilters({ ...filters, category: newCats });
    setActiveCollectionId(null); // Clear collection when manual filter used
  };

  const handleCollectionSelect = (id: string | null) => {
     if (id === activeCollectionId) {
       setActiveCollectionId(null);
     } else {
       setActiveCollectionId(id);
       // Reset other filters to avoid empty states
       setFilters({ ...filters, category: [] }); 
     }
  };

  // Compare Logic
  const toggleCompare = (agent: AgentProduct) => {
    if (compareList.find(a => a.id === agent.id)) {
      setCompareList(prev => prev.filter(a => a.id !== agent.id));
    } else {
      if (compareList.length >= 3) {
        // Maybe toast notification here: "Max 3 agents"
        return;
      }
      setCompareList(prev => [...prev, agent]);
    }
  };

  // Find the bundle for the spotlight
  const spotlightBundle = filteredAgents.find(a => a.category === AgentCategory.BUNDLE) || filteredAgents[0];

  return (
    <div id="fleet" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. Hero & Search */}
      <Hero onSearch={setSearchQuery} />
      
      {/* 2. New Collections Rail */}
      <CollectionsRail 
         collections={collections} 
         activeCollectionId={activeCollectionId} 
         onSelectCollection={handleCollectionSelect} 
      />

      {/* 3. Quick Category Pills */}
      <QuickCategories 
        activeCategories={filters.category} 
        onToggleCategory={handleCategoryToggle} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12" id="catalog-grid">
        
        {/* 4. Left Sidebar Filters (Desktop) */}
        <div className="hidden lg:block col-span-1">
          <div className="sticky top-28">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8 pb-4 border-b border-gray-100 dark:border-dark-900">
              Refine Specification
            </h2>
            <FilterSidebar filters={filters} onChange={setFilters} />
          </div>
        </div>

        {/* 5. Main Results Grid */}
        <div className="col-span-1 lg:col-span-3">
          
          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-dark-900">
            <div className="text-sm text-gray-500 font-mono">
              <span className="text-black dark:text-white font-bold">{filteredAgents.length}</span> SpecFiles Found
            </div>
            
            <div className="flex gap-3">
              {/* Mobile Filter Trigger */}
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-lg font-bold text-xs"
              >
                <Icons.Menu className="w-3 h-3" /> Filters
              </button>

              <select 
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-lg font-bold text-xs text-black dark:text-white outline-none focus:border-brand-500 cursor-pointer"
              >
                <option value="popular">Popularity</option>
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-80 rounded-2xl bg-gray-50 dark:bg-dark-900 animate-pulse border border-gray-100 dark:border-dark-800" />
              ))}
            </div>
          ) : filteredAgents.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Insert Featured Bundle as the first card if available and on page 1 */}
                {currentPage === 1 && spotlightBundle && spotlightBundle.category === AgentCategory.BUNDLE && !activeCollectionId && (
                  <FeaturedBundle 
                    bundle={spotlightBundle} 
                    onView={onViewProduct} 
                  />
                )}

                {/* Map remaining agents */}
                {paginatedAgents
                  .filter(a => currentPage !== 1 || activeCollectionId || a.id !== spotlightBundle?.id) // Prevent duplicate
                  .map(agent => (
                  <AgentCard 
                    key={agent.id} 
                    agent={agent} 
                    onView={onViewProduct}
                    onAddToCart={onAddToCart}
                    onCompare={toggleCompare}
                    isComparing={!!compareList.find(a => a.id === agent.id)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center items-center gap-2">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-3 rounded-xl border border-gray-200 dark:border-dark-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Icons.ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-12 h-12 rounded-xl text-sm font-bold transition-all ${
                          currentPage === page
                            ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                            : 'bg-white dark:bg-dark-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-dark-800 hover:bg-gray-50 dark:hover:bg-dark-800'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-xl border border-gray-200 dark:border-dark-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Icons.ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-gray-50/50 dark:bg-dark-900/30 rounded-3xl border-2 border-dashed border-gray-200 dark:border-dark-800">
               <Icons.Search className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-6" />
               <p className="text-gray-500 font-bold">No agents match your current specification filters.</p>
               <button 
                 onClick={() => {
                   setFilters({ category: [], platforms: [], licenseTiers: [], minPrice: 0, maxPrice: 300, minRating: null });
                   setSearchQuery('');
                   setActiveCollectionId(null);
                 }} 
                 className="mt-4 text-brand-500 font-bold hover:underline"
               >
                 Reset All Filters
               </button>
            </div>
          )}
        </div>
      </div>

      {/* 6. Comparison Bar & Modal */}
      <CompareBar 
        selectedAgents={compareList} 
        onClear={() => setCompareList([])} 
        onCompare={() => setIsCompareModalOpen(true)}
        onRemove={(id) => setCompareList(prev => prev.filter(a => a.id !== id))}
      />

      <CompareModal 
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        agents={compareList}
        onAddToCart={onAddToCart}
      />

      {/* 7. Trust Signals Bar */}
      <TrustSignals />

      {/* 8. Newsletter Capture */}
      <NewsletterBox />

      {/* Mobile Filter Drawer Overlay */}
      {isFilterOpen && (
          <div className="fixed inset-0 z-[100] flex lg:hidden">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
            <div className="relative w-full max-w-xs bg-white dark:bg-dark-950 h-full p-8 shadow-2xl overflow-y-auto animate-fade-in transition-all">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-black text-black dark:text-white uppercase tracking-tighter">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="text-black dark:text-white">
                  <Icons.X className="w-6 h-6" />
                </button>
              </div>
              <FilterSidebar filters={filters} onChange={setFilters} />
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full mt-10 py-4 bg-brand-500 text-white font-bold rounded-xl"
              >
                Apply Constraints
              </button>
            </div>
          </div>
        )}
    </div>
  );
};