'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Recipe } from '@/types';
import { useFavorites } from '@/hooks/use-favorites';
import { RecipeForm } from './recipe-form';
import { RecipeCard } from './recipe-card';
import { FavoritesList } from './favorites-list';
import { Skeleton } from '@/components/ui/skeleton';
import { generateRecipeImageAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

export function RecipeGenerator() {
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const { favorites, addFavorite, removeFavorite, isFavorite, isLoaded } = useFavorites();
  const { toast } = useToast();

  const handleToggleFavorite = useCallback(
    (recipe: Recipe) => {
      if (isFavorite(recipe.title)) {
        removeFavorite(recipe.title);
      } else {
        addFavorite(recipe);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  const handleRecipeGenerated = (recipe: Recipe) => {
    setGeneratedRecipe(recipe);
    setIsGeneratingImage(true);
  }

  useEffect(() => {
    if (generatedRecipe && isGeneratingImage) {
      generateRecipeImageAction({ title: generatedRecipe.title })
        .then(({ imageUrl }) => {
          setGeneratedRecipe((prevRecipe) =>
            prevRecipe ? { ...prevRecipe, imageUrl } : null
          );
        })
        .catch((error) => {
          console.error("Image generation failed", error);
          toast({
            variant: 'destructive',
            title: 'Image Generation Failed',
            description: 'Could not create an image for this recipe. Please try again.',
          });
        })
        .finally(() => {
          setIsGeneratingImage(false);
        });
    }
  }, [generatedRecipe, isGeneratingImage, toast]);
  

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <RecipeForm
          onRecipeGenerated={handleRecipeGenerated}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
        {isLoading && <RecipeCardSkeleton />}
        {generatedRecipe && !isLoading && (
          <div>
            <h2 className="text-3xl font-headline font-bold mb-4 text-primary">Your Generated Recipe</h2>
            <RecipeCard
              recipe={generatedRecipe}
              isFavorite={isFavorite(generatedRecipe.title)}
              onToggleFavorite={() => handleToggleFavorite(generatedRecipe)}
              isGeneratingImage={isGeneratingImage}
            />
          </div>
        )}
      </div>
      <div>
        <FavoritesList
          favorites={favorites}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
          isLoaded={isLoaded}
        />
      </div>
    </div>
  );
}

function RecipeCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
       <div className="space-y-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  )
}
