// tag: don't regression this feature
import React, { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('openops_favorites');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('openops_favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('favorites-updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favorites-updated', handleStorageChange);
    };
  }, []);

  const toggleFavorite = (e: React.MouseEvent | null, agentId: string) => {
    if (e) {
        e.stopPropagation();
        e.preventDefault();
    }
    
    setFavorites(prev => {
      const newFavorites = prev.includes(agentId)
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId];
      localStorage.setItem('openops_favorites', JSON.stringify(newFavorites));
      window.dispatchEvent(new Event('favorites-updated'));
      return newFavorites;
    });
  };
  
  // Specific remove function for easier binding
  const removeFromFavorites = (agentId: string) => {
      setFavorites(prev => {
          const newFavorites = prev.filter(id => id !== agentId);
          localStorage.setItem('openops_favorites', JSON.stringify(newFavorites));
          window.dispatchEvent(new Event('favorites-updated'));
          return newFavorites;
      });
  }

  const isFavorite = (agentId: string) => favorites.includes(agentId);

  return { favorites, isFavorite, toggleFavorite, removeFromFavorites };
};