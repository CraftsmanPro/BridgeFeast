'use client';

import type { Recipe } from '@/types';
import { RecipeCard } from './recipe-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Heart } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

type FavoritesListProps = {
  favorites: Recipe[];
  isFavorite: (title: string) => boolean;
  onToggleFavorite: (recipe: Recipe) => void;
  isLoaded: boolean;
};

export function FavoritesList({
  favorites,
  isFavorite,
  onToggleFavorite,
  isLoaded
}: FavoritesListProps) {
  if (!isLoaded) {
    return <FavoritesSkeleton />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-headline font-bold text-primary flex items-center gap-2">
        <Heart className="h-7 w-7" />
        Your Favorite Recipes
      </h2>
      {favorites.length === 0 ? (
        <div className="text-center text-muted-foreground border-2 border-dashed rounded-lg p-8">
          <p className="font-semibold">No favorites yet!</p>
          <p>Click the star on a recipe to save it here.</p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {favorites.map((recipe) => (
             <AccordionItem value={recipe.title} key={recipe.title} className="border-none">
              <AccordionTrigger className="bg-card p-4 rounded-lg shadow-md hover:no-underline hover:shadow-lg transition-shadow text-left">
                <span className="font-headline text-lg">{recipe.title}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <RecipeCard
                    recipe={recipe}
                    isFavorite={isFavorite(recipe.title)}
                    onToggleFavorite={() => onToggleFavorite(recipe)}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}


function FavoritesSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-9 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  )
}
