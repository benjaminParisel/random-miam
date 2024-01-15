import type { Recipe } from '@prisma/client';
import prisma from '@/lib/prisma';
import { recipeSchema, recipeTypeSchema, recipesSchema } from '@/schema/recipe';

export const getAllRecipesWith = async (type: string) => {
  const data: Recipe[] = await prisma.recipe.findMany({
    where: {
      type: type,
    },
  });
  const recipes = recipesSchema.parse(data);
  return recipes;
};

export const createRecipe = async (recipe: Recipe) => {
  const recipeCreated = await prisma.recipe.create({
    data: {
      title: recipe.title,
      details: recipe.details,
      type: recipe.type,
    },
  });

  return recipeCreated;
};

export const getRecipeById = async (id: string) => {
  const recipeRes = await prisma.recipe.findFirst({
    where: {
      id: id,
    },
  });
  const recipe = recipeSchema.parse(recipeRes);
  return recipe;
};
