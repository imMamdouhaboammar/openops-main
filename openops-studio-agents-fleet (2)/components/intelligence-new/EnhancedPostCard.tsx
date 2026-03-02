
// tag: don't regression this feature
import React from 'react';
import { BlogPost } from '../../types';
import { Icons } from '../Icons';

interface EnhancedPostCardProps {
  post: BlogPost;
  onClick: () => void;
  featured?: boolean;
}

export const EnhancedPostCard: React.FC<EnhancedPostCardProps> = ({ post, onClick, featured }) => {
  // Logic to determine difficulty/audience based on category
  const getBadge = () => {
    if (post.category === 'Blueprint') return { label: 'Technical', color: 'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800' };
    if (post.category === 'Intel') return { label: 'Strategy', color: 'text-purple-600 bg-purple-50 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800' };
    return { label: 'Guide', color: 'text-green-600 bg-green-50 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' };
  };

  const badge = getBadge();

  return (
    <div 
      onClick={onClick}
      className={`
        group relative flex flex-col h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
        ${featured 
          ? 'bg-slate-900 dark:bg-slate-900 border border-slate-800 md:col-span-2 md:flex-row' 
          : 'bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 hover:border-brand-500/50 hover:shadow-xl dark:hover:shadow-none'}
      `}
    >
      {/* Decorative gradient for hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-500/0 via-brand-500/0 to-brand-500/0 group-hover:from-brand-500/5 group-hover:to-purple-500/5 transition-all duration-500"></div>

      <div className={`p-8 flex flex-col justify-between ${featured ? 'md:w-3/4' : 'w-full'}`}>
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${badge.color}`}>
              {badge.label}
            </span>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
              <Icons.Clock className="w-3 h-3" />
              {post.readTime}
            </div>
          </div>

          <h3 className={`font-black tracking-tight mb-4 text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-500 transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
            {post.title}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-dark-800">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-800 flex items-center justify-center font-bold text-xs text-gray-600 dark:text-gray-300">
                {post.author.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                 <span className="text-xs font-bold text-slate-900 dark:text-white">{post.author.name}</span>
                 <span className="text-[10px] text-gray-400">{post.author.role}</span>
              </div>
           </div>
           
           <div className={`
             flex items-center gap-1 text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform
             ${featured ? 'text-white' : 'text-brand-600 dark:text-brand-500'}
           `}>
             Read <Icons.ArrowLeft className="w-3 h-3 rotate-180" />
           </div>
        </div>
      </div>

      {featured && (
        <div className="hidden md:flex md:w-1/4 bg-slate-800 items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
           <Icons.Terminal className="w-24 h-24 text-slate-700" />
        </div>
      )}
    </div>
  );
};
