'use server';

import {
  generateRecipe as generateRecipeFlow,
  type GenerateRecipeInput,
  type GenerateRecipeOutput,
} from '@/ai/flows/generate-recipe';

import {
  generateRecipeImage as generateRecipeImageFlow,
  type GenerateRecipeImageInput,
  type GenerateRecipeImageOutput,
} from '@/ai/flows/generate-recipe-image';


export async function generateRecipeAction(
  input: GenerateRecipeInput
): Promise<GenerateRecipeOutput> {
  // This is a thin wrapper around the Genkit flow.
  // You could add additional logic here, like saving to a database.
  return await generateRecipeFlow(input);
}

export async function generateRecipeImageAction(
  input: GenerateRecipeImageInput
): Promise<GenerateRecipeImageOutput> {
  return await generateRecipeImageFlow(input);
}
