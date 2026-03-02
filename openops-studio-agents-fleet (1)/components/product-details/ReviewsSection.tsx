
import React from 'react';
import { Review } from '../../types';
import { Icons } from '../Icons';

interface ReviewsSectionProps {
  reviews: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <div className="mt-20 border-t border-gray-100 dark:border-dark-900 pt-10">
       <h3 className="text-2xl font-bold text-black dark:text-white mb-8">Verified Reviews</h3>
        <div className="grid gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="p-6 bg-gray-50 dark:bg-dark-900/50 rounded-xl border border-gray-100 dark:border-dark-800">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-dark-700 dark:to-dark-800 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-black dark:text-white">{review.author}</div>
                    <div className="text-xs text-gray-500">{review.role}</div>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Icons.Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300 dark:text-dark-700'}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">"{review.comment}"</p>
              <div className="mt-4 text-xs text-gray-400">{review.date}</div>
            </div>
          ))}
        </div>
    </div>
  );
};
