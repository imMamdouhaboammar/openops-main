
// tag: don't regression this feature
import React, { useState } from 'react';
import { BlogPost } from '../../types';
import { intelligenceData } from '../../lib/intelligence/data';
import { BlogHero } from '../blog/BlogHero';
import { PostCard } from '../blog/PostCard'; // Reusing PostCard for now, can upgrade later
import { IntelReader } from './IntelReader';

interface IntelHubProps {
  onBack: () => void;
}

export const IntelHub: React.FC<IntelHubProps> = ({ onBack }) => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  if (activePost) {
    return <IntelReader post={activePost} onBack={() => { setActivePost(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} />;
  }

  // Split content
  const featuredPost = intelligenceData[0];
  const technicalPosts = intelligenceData.filter(p => p.category === 'Blueprint' || p.category === 'Architecture');
  const strategicPosts = intelligenceData.filter(p => p.category !== 'Blueprint' && p.category !== 'Architecture' && p.id !== featuredPost.id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black pt-20 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <BlogHero />

        {/* Featured Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest">Priority Transmission</h2>
          </div>
          <PostCard post={featuredPost} onClick={() => setActivePost(featuredPost)} featured={true} />
        </div>

        {/* Technical Deep Dives */}
        <div className="mb-20">
           <div className="flex items-center gap-3 mb-8">
             <h2 className="text-2xl font-bold text-black dark:text-white">Engineering Protocols</h2>
             <div className="h-px bg-gray-200 dark:bg-dark-800 flex-1"></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {technicalPosts.map(post => (
                 <PostCard key={post.id} post={post} onClick={() => setActivePost(post)} />
              ))}
           </div>
        </div>

        {/* Strategic Intel */}
        <div className="mb-20">
           <div className="flex items-center gap-3 mb-8">
             <h2 className="text-2xl font-bold text-black dark:text-white">Strategic Intelligence</h2>
             <div className="h-px bg-gray-200 dark:bg-dark-800 flex-1"></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {strategicPosts.map(post => (
                 <PostCard key={post.id} post={post} onClick={() => setActivePost(post)} />
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};
