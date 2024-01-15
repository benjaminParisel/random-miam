import * as z from 'zod';

export const recipeTypeSchema = z.union([
  z.literal('entree'),
  z.literal('plat'),
  z.literal('dessert'),
]);

export const recipeSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  details: z.string().optional(),
  type: recipeTypeSchema,
});

export const recipesSchema = z.array(recipeSchema);

export type recipeSchemaType = z.infer<typeof recipeSchema>;
