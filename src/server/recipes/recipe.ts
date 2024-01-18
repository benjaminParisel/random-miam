'use server';
import type { Recipe } from '@prisma/client';
import prisma from '@/lib/prisma';
import { recipeSchema, recipeSchemaType, recipesSchema } from '@/schema/recipe';

export const getAllRecipesWith = async (type: string) => {
  const data: Recipe[] = await prisma.recipe.findMany({
    where: {
      type: type,
    },
  });
  const recipes = recipesSchema.parse(data);
  return recipes;
};

export const createRecipe = async (recipe: recipeSchemaType) => {
  const validation = recipeSchema.safeParse(recipe);
  if (!validation.success) {
    throw new Error('Recipe is not valid');
  }

  const recipeCreated = await prisma.recipe.create({
    data: {
      title: recipe.title,
      details: recipe.details,
      type: recipe.type,
    },
  });

  return recipeCreated;
};

export const updateRecipe = async (recipe: recipeSchemaType) => {
  const validation = recipeSchema.safeParse(recipe);
  if (!validation.success) {
    throw new Error('Recipe is not valid');
  }

  const recipeUpdated = await prisma.recipe.update({
    where: {
      id: recipe.id,
    },
    data: {
      title: recipe.title,
      details: recipe.details,
    },
  });
  return recipeUpdated;
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
