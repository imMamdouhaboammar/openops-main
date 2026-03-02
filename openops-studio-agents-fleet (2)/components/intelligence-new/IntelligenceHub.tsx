
// tag: don't regression this feature
import React, { useState } from 'react';
import { BlogPost, AgentProduct } from '../../types';
import { intelligenceData } from '../../lib/intelligence/data';
import { blogPosts } from '../../lib/blogData';
import { IntelligenceHeader } from './IntelligenceHeader';
import { CategoryTabs } from './CategoryTabs';
import { EnhancedPostCard } from './EnhancedPostCard';
import { AgentContextWidget } from './AgentContextWidget';
import { IntelReader } from '../intelligence/IntelReader'; // Reuse existing reader for continuity
import { Icons } from '../Icons';

interface IntelligenceHubProps {
  onBack: () => void;
  onViewProduct: (agent: AgentProduct) => void;
}

export const IntelligenceHub: React.FC<IntelligenceHubProps> = ({ onBack, onViewProduct }) => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Merge legacy blog data with new intelligence data for a full list
  const allPosts = [...intelligenceData, ...blogPosts];

  const filteredPosts = activeCategory === 'All' 
    ? allPosts 
    : allPosts.filter(p => p.category.includes(activeCategory) || (activeCategory === 'Regional (MENA)' && p.category.includes('Regional')));

  // Separate featured post (latest Blueprint or Intel)
  const featuredPost = filteredPosts.find(p => p.category === 'Blueprint' || p.category === 'Architecture') || filteredPosts[0];
  const gridPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

  if (activePost) {
    return (
      <div className="min-h-screen bg-white dark:bg-black pt-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
               <IntelReader post={activePost} onBack={() => { setActivePost(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} />
            </div>
            {/* Contextual Sidebar only visible when reading */}
            <div className="hidden lg:block w-80 pt-32">
               <AgentContextWidget relatedIds={activePost.relatedProductIds} onViewProduct={onViewProduct} />
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black pt-24 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <IntelligenceHeader />
        
        <CategoryTabs activeCategory={activeCategory} onSelect={setActiveCategory} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
             {filteredPosts.length === 0 ? (
               <div className="text-center py-20 bg-white dark:bg-dark-900 rounded-2xl border border-dashed border-gray-200 dark:border-dark-800">
                  <Icons.Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No transmissions found in this frequency.</p>
                  <button onClick={() => setActiveCategory('All')} className="text-brand-500 font-bold mt-2 hover:underline">Reset Signal</button>
               </div>
             ) : (
               <>
                 {/* Featured Slot */}
                 {featuredPost && (
                   <EnhancedPostCard 
                     post={featuredPost} 
                     onClick={() => { setActivePost(featuredPost); window.scrollTo(0,0); }} 
                     featured={true} 
                   />
                 )}
                 
                 {/* Grid Slots */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gridPosts.map(post => (
                      <EnhancedPostCard 
                        key={post.id} 
                        post={post} 
                        onClick={() => { setActivePost(post); window.scrollTo(0,0); }} 
                      />
                    ))}
                 </div>
               </>
             )}
          </div>

          {/* Right Sidebar (Discovery) */}
          <div className="lg:col-span-4 space-y-8">
             {/* E-Commerce Hook */}
             <AgentContextWidget onViewProduct={onViewProduct} />

             {/* Trending Topics */}
             <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-2xl p-6">
                <h3 className="font-bold text-black dark:text-white mb-4 text-sm uppercase tracking-wider">Top Signals</h3>
                <div className="space-y-4">
                   {['Enterprise Architecture', 'Saudi Vision 2030', 'Agent Orchestration', 'LLM Security'].map((topic, i) => (
                      <div key={i} className="flex items-center justify-between group cursor-pointer">
                         <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-brand-500 transition-colors">#{topic}</span>
                         <span className="text-xs text-gray-400 font-mono">1.{8-i}k reads</span>
                      </div>
                   ))}
                </div>
             </div>

             {/* Newsletter Mini */}
             <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                <Icons.Rss className="absolute -bottom-4 -right-4 w-24 h-24 text-slate-800 rotate-12" />
                <h3 className="font-bold mb-2 relative z-10">Daily Briefing</h3>
                <p className="text-xs text-slate-400 mb-4 relative z-10 leading-relaxed">
                   Get new agent blueprints delivered to your inbox before they hit the public fleet.
                </p>
                <div className="flex gap-2 relative z-10">
                   <input type="email" placeholder="Email" className="w-full bg-slate-800 border-none rounded-lg text-xs px-3 py-2 text-white placeholder:text-slate-500" />
                   <button className="bg-brand-500 text-white rounded-lg p-2">
                      <Icons.ArrowLeft className="w-4 h-4 rotate-180" />
                   </button>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
