
// tag: don't regression this feature
import React, { useState } from 'react';
import { BlogHero } from './BlogHero';
import { PostCard } from './PostCard';
import { ArticleReader } from './ArticleReader';
import { blogPosts } from '../../lib/blogData';
import { BlogPost } from '../../types';

interface BlogHubProps {
  onBack: () => void;
}

export const BlogHub: React.FC<BlogHubProps> = ({ onBack }) => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  if (activePost) {
    return <ArticleReader post={activePost} onBack={() => { setActivePost(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} />;
  }

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black pt-20 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        {/* <div className="mb-8">
           <button onClick={onBack} className="text-xs font-bold text-gray-400 hover:text-black dark:hover:text-white uppercase tracking-wider flex items-center gap-2">
             OpenOps Fleet / Intelligence
           </button>
        </div> */}

        <BlogHero />

        {/* Featured Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
           <div className="lg:col-span-8">
             <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">High Priority Transmission</h2>
             <div className="h-full">
                <PostCard post={featuredPost} onClick={() => setActivePost(featuredPost)} featured={true} />
             </div>
           </div>
           
           <div className="lg:col-span-4 flex flex-col justify-center bg-white dark:bg-dark-900 rounded-2xl p-8 border border-gray-200 dark:border-dark-800">
              <h3 className="font-bold text-lg text-black dark:text-white mb-4">Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                 {['Architecture', 'ROI', 'LLM Security', 'Operations', 'Blueprints', 'Case Studies'].map(tag => (
                   <span key={tag} className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-dark-950 hover:bg-brand-50 dark:hover:bg-brand-900/10 text-gray-600 dark:text-gray-400 text-xs cursor-pointer transition-colors border border-transparent hover:border-brand-200">
                     #{tag}
                   </span>
                 ))}
              </div>
           </div>
        </div>

        {/* Recent Grid */}
        <div className="mb-8">
           <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Recent Signals</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map(post => (
                 <PostCard key={post.id} post={post} onClick={() => setActivePost(post)} />
              ))}
              
              {/* Coming Soon Placeholders to fill grid */}
              <div className="rounded-2xl border border-dashed border-gray-300 dark:border-dark-700 bg-transparent flex flex-col items-center justify-center p-10 text-center opacity-50">
                 <p className="text-sm font-bold text-gray-500">More Intelligence Incoming...</p>
                 <p className="text-xs text-gray-400 mt-1">Signals decrypting</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
