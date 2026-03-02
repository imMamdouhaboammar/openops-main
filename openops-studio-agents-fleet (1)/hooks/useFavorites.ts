
import { useState, useEffect } from 'react';

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

  const toggleFavorite = (e: React.MouseEvent, agentId: string) => {
    e.stopPropagation();
    e.preventDefault();
    
    setFavorites(prev => {
      const newFavorites = prev.includes(agentId)
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId];
      localStorage.setItem('openops_favorites', JSON.stringify(newFavorites));
      window.dispatchEvent(new Event('favorites-updated'));
      return newFavorites;
    });
  };

  const isFavorite = (agentId: string) => favorites.includes(agentId);

  return { isFavorite, toggleFavorite };
};
