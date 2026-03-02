
// tag: don't regression this feature
import React from 'react';
import { BlogPost, BlogBlock } from '../../types';
import { Icons } from '../Icons';

interface ArticleReaderProps {
  post: BlogPost;
  onBack: () => void;
}

const renderBlock = (block: BlogBlock, idx: number) => {
  switch (block.type) {
    case 'header':
      return <h2 key={idx} className="text-2xl font-bold text-black dark:text-white mt-8 mb-4">{block.content}</h2>;
    case 'quote':
      return (
        <div key={idx} className="border-l-4 border-brand-500 pl-6 py-2 my-8 italic text-xl text-gray-700 dark:text-gray-300">
          "{block.content}"
        </div>
      );
    case 'code':
      return (
        <div key={idx} className="my-6 rounded-xl bg-slate-900 border border-slate-800 p-6 overflow-x-auto">
          {block.language && <div className="text-[10px] font-mono text-gray-500 uppercase mb-2">{block.language}</div>}
          <pre className="text-sm font-mono text-green-400 leading-relaxed whitespace-pre-wrap">
            {block.content}
          </pre>
        </div>
      );
    case 'text':
    default:
      return <p key={idx} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-lg">{block.content}</p>;
  }
};

export const ArticleReader: React.FC<ArticleReaderProps> = ({ post, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Nav */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white mb-8 transition-colors group"
      >
        <div className="p-1 rounded-full bg-gray-100 dark:bg-dark-900 group-hover:bg-brand-500 group-hover:text-white transition-colors">
          <Icons.ArrowLeft className="w-4 h-4" />
        </div>
        <span className="font-medium">Back to Intelligence Hub</span>
      </button>

      {/* Header */}
      <div className="mb-12 border-b border-gray-100 dark:border-dark-900 pb-12">
        <div className="flex gap-2 mb-6">
           <span className="px-3 py-1 rounded bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-500 text-xs font-bold uppercase tracking-wider">
             {post.category}
           </span>
           <span className="px-3 py-1 rounded bg-gray-100 dark:bg-dark-800 text-gray-500 text-xs font-bold uppercase tracking-wider">
             {post.readTime} Read
           </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-8 leading-tight tracking-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xl">
                 {post.author.name.charAt(0)}
              </div>
              <div>
                 <div className="flex items-center gap-2">
                    <span className="font-bold text-black dark:text-white">{post.author.name}</span>
                    {post.author.verified && <Icons.Check className="w-4 h-4 text-blue-500" />}
                 </div>
                 <div className="text-xs text-gray-500">{post.author.role} • {post.date}</div>
              </div>
           </div>
           
           <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                 <Icons.Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-400 hover:text-red-500 transition-colors">
                 <Icons.Heart className="w-5 h-5" />
              </button>
           </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="prose dark:prose-invert max-w-none">
        {post.content.map((block, idx) => renderBlock(block, idx))}
      </div>

      {/* Footer Tags */}
      <div className="mt-16 pt-8 border-t border-gray-100 dark:border-dark-900">
         <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
               <span key={tag} className="px-3 py-1 rounded-lg bg-gray-50 dark:bg-dark-900 text-gray-500 text-xs font-medium border border-gray-100 dark:border-dark-800">
                  #{tag}
               </span>
            ))}
         </div>
      </div>
      
    </div>
  );
};
