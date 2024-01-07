import type { Recipe } from '@prisma/client';
import prisma from '@/lib/prisma';

export const getAllRecipesWith = async (type: string) => {
  const recipes: Array<Recipe> = await prisma.recipe.findMany({
    where: {
      type: type,
    },
  });
  return recipes;
};
