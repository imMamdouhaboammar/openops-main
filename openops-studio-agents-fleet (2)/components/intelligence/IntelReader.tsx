
// tag: don't regression this feature
import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../types';
import { Icons } from '../Icons';
import { CodeBlock } from './CodeBlock';

interface IntelReaderProps {
  post: BlogPost;
  onBack: () => void;
}

export const IntelReader: React.FC<IntelReaderProps> = ({ post, onBack }) => {
  const [readingProgress, setReadingProgress] = useState(0);

  // Scroll Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Block Renderer
  const renderBlock = (block: any, idx: number) => {
    switch (block.type) {
      case 'header':
        return <h2 key={idx} className="text-3xl font-bold text-black dark:text-white mt-12 mb-6 tracking-tight">{block.content}</h2>;
      case 'subheader':
        return <h3 key={idx} className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4 tracking-tight">{block.content}</h3>;
      case 'quote':
        return (
          <figure key={idx} className="my-10 pl-6 border-l-4 border-brand-500 bg-brand-50/20 dark:bg-brand-900/10 p-6 rounded-r-xl">
            <blockquote className="text-xl italic text-gray-800 dark:text-gray-200 leading-relaxed font-serif">
              "{block.content}"
            </blockquote>
          </figure>
        );
      case 'callout':
        return (
          <div key={idx} className={`my-8 p-6 rounded-xl border flex gap-4 ${
            block.variant === 'warning' ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800' :
            block.variant === 'tip' ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' :
            'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800'
          }`}>
             <div className="shrink-0 mt-1">
               {block.variant === 'warning' ? <Icons.AlertTriangle className="w-5 h-5 text-orange-500" /> :
                block.variant === 'tip' ? <Icons.Sparkles className="w-5 h-5 text-green-500" /> :
                <Icons.Activity className="w-5 h-5 text-blue-500" />}
             </div>
             <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
               {block.content}
             </div>
          </div>
        );
      case 'code':
        return <CodeBlock key={idx} language={block.language || 'typescript'} code={block.content} />;
      case 'divider':
        return <div key={idx} className="my-12 h-px bg-gray-200 dark:bg-dark-800 w-1/2 mx-auto" />;
      case 'list':
        return (
          <ul key={idx} className="my-6 space-y-3">
             {(block.content as string[]).map((item, i) => (
               <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                 <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-brand-500 mt-2.5"></span>
                 <span>{item}</span>
               </li>
             ))}
          </ul>
        );
      case 'text':
      default:
        return <p key={idx} className="text-gray-600 dark:text-gray-300 leading-8 mb-6 text-lg font-serif">{block.content}</p>;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors pb-32">
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-brand-500 z-50 transition-all duration-100" style={{ width: `${readingProgress}%` }} />

      {/* Hero Header */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center border-b border-gray-100 dark:border-dark-900">
        <div className="flex justify-center gap-2 mb-8">
           <span className="px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 text-xs font-bold uppercase tracking-widest">
             {post.category}
           </span>
           <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-dark-800 text-gray-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
             <Icons.Clock className="w-3 h-3" /> {post.readTime}
           </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tight leading-tight mb-6">
          {post.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
          {post.subtitle || post.excerpt}
        </p>

        {/* Author */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-dark-800 flex items-center justify-center text-lg font-bold text-gray-600 dark:text-gray-400">
            {post.author.name.charAt(0)}
          </div>
          <div className="text-left">
             <div className="font-bold text-black dark:text-white flex items-center gap-1">
                {post.author.name}
                {post.author.verified && <Icons.Check className="w-4 h-4 text-blue-500" />}
             </div>
             <div className="text-xs text-gray-500 uppercase tracking-wide font-bold">{post.author.role}</div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
         
         {/* Left: Engagement Sidebar (Sticky) */}
         <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-32 flex flex-col gap-6 items-end">
               <button onClick={onBack} className="p-3 rounded-full bg-gray-50 dark:bg-dark-900 hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-500 transition-colors mb-8 group" title="Back">
                  <Icons.ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
               </button>

               <div className="flex flex-col items-center gap-2">
                 <button className="p-4 rounded-full bg-brand-50 dark:bg-brand-900/10 text-brand-600 dark:text-brand-500 hover:scale-110 transition-transform">
                   <Icons.Heart className="w-6 h-6 fill-current" />
                 </button>
                 <span className="text-xs font-bold text-gray-400">{post.likes}</span>
               </div>
               
               <button className="p-4 rounded-full bg-gray-50 dark:bg-dark-900 text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                 <Icons.Share2 className="w-6 h-6" />
               </button>
            </div>
         </div>

         {/* Center: Article Body */}
         <div className="lg:col-span-8 max-w-3xl mx-auto w-full">
            {post.content.map((block, idx) => renderBlock(block, idx))}

            {/* Post-Article Tags */}
            <div className="mt-20 pt-10 border-t border-gray-100 dark:border-dark-900">
               <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                     <span key={tag} className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-dark-900 text-sm font-bold text-gray-600 dark:text-gray-400">
                        #{tag}
                     </span>
                  ))}
               </div>
            </div>
         </div>

         {/* Right: Metadata & Related (Sticky) */}
         <div className="hidden lg:block lg:col-span-2">
            {/* Can add TOC here later */}
         </div>

      </div>
    </div>
  );
};
