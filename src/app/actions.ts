'use server';

import {
  generateRecipe as generateRecipeFlow,
  type GenerateRecipeInput,
  type GenerateRecipeOutput,
} from '@/ai/flows/generate-recipe';

export async function generateRecipeAction(
  input: GenerateRecipeInput
): Promise<GenerateRecipeOutput> {
  // This is a thin wrapper around the Genkit flow.
  // You could add additional logic here, like saving to a database.
  return await generateRecipeFlow(input);
}
