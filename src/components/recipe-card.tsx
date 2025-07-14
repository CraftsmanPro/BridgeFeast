'use client';

import Image from 'next/image';
import type { Recipe } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Star, Utensils, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

type RecipeCardProps = {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isGeneratingImage?: boolean;
};

export function RecipeCard({ recipe, isFavorite, onToggleFavorite, isGeneratingImage }: RecipeCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-grow">
            <CardTitle className="font-headline text-2xl">{recipe.title}</CardTitle>
            <CardDescription>A delicious recipe made just for you.</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="shrink-0"
          >
            <Star
              className={cn(
                'h-6 w-6 transition-all duration-300',
                isFavorite
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-muted-foreground'
              )}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
           {isGeneratingImage && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground z-10">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>Generating image...</p>
            </div>
           )}
           {!isGeneratingImage && !recipe.imageUrl && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <ImageIcon className="h-12 w-12" />
                <p>No image available</p>
              </div>
            )}
           {recipe.imageUrl && (
             <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
           )}
        </div>

        <div>
          <h3 className="font-headline font-bold text-lg mb-2 flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            Ingredients
          </h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-headline font-bold text-lg mb-2 flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            Instructions
          </h3>
          <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
            {recipe.instructions}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Enjoy your meal! Remember to adjust seasonings to your taste.
        </p>
      </CardFooter>
    </Card>
  );
}
