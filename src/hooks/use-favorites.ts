'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Recipe } from '@/types';

const FAVORITES_KEY = 'fridge-feast-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(FAVORITES_KEY);
      if (item) {
        setFavorites(JSON.parse(item));
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites to localStorage', error);
      }
    }
  }, [favorites, isLoaded]);

  const addFavorite = useCallback((recipe: Recipe) => {
    setFavorites((prev) => [...prev, recipe]);
  }, []);

  const removeFavorite = useCallback((recipeTitle: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.title !== recipeTitle));
  }, []);

  const isFavorite = useCallback(
    (recipeTitle: string) => {
      return favorites.some((fav) => fav.title === recipeTitle);
    },
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite, isLoaded };
}
