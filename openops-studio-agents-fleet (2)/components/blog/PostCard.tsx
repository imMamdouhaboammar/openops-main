
// tag: don't regression this feature
import React from 'react';
import { BlogPost } from '../../types';
import { Icons } from '../Icons';

interface PostCardProps {
  post: BlogPost;
  onClick: () => void;
  featured?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick, featured = false }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        group cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col h-full
        ${featured 
          ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-800 dark:border-slate-200' 
          : 'bg-white dark:bg-dark-900 border-gray-100 dark:border-dark-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:shadow-xl dark:hover:shadow-none'}
      `}
    >
      <div className="p-8 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
           <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${
             featured 
             ? 'border-white/20 bg-white/10 text-brand-300 dark:text-brand-600' 
             : 'border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-800 text-brand-600 dark:text-brand-500'
           }`}>
             {post.category}
           </span>
           <div className={`flex items-center gap-2 text-xs ${featured ? 'text-gray-400 dark:text-gray-500' : 'text-gray-400'}`}>
              <Icons.Clock className="w-3 h-3" />
              {post.readTime} read
           </div>
        </div>

        <h3 className={`font-black tracking-tight mb-4 group-hover:text-brand-500 transition-colors ${featured ? 'text-3xl' : 'text-xl'}`}>
          {post.title}
        </h3>

        <p className={`text-sm leading-relaxed mb-8 line-clamp-3 ${featured ? 'text-gray-400 dark:text-gray-600' : 'text-gray-500'}`}>
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-dashed border-gray-200/20">
           <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${featured ? 'bg-white text-black dark:bg-black dark:text-white' : 'bg-black text-white dark:bg-white dark:text-black'}`}>
                {post.author.name.charAt(0)}
              </div>
              <div>
                 <div className={`text-xs font-bold ${featured ? 'text-white dark:text-black' : 'text-black dark:text-white'}`}>{post.author.name}</div>
                 <div className={`text-[10px] ${featured ? 'text-gray-500' : 'text-gray-400'}`}>{post.author.role}</div>
              </div>
           </div>
           <Icons.ArrowLeft className={`w-5 h-5 rotate-180 transform group-hover:translate-x-1 transition-transform ${featured ? 'text-white dark:text-black' : 'text-black dark:text-white'}`} />
        </div>
      </div>
    </div>
  );
};
