export type Recipe = {
  id?: string;
  title?: string;
  details?: string | null;
  type: RecipeType;
};

export type RecipeType = 'Entrees' | 'Plat' | 'Desserts';

export const RecipeType = {
  Entree: 'Entrees',
  Plat: 'Plat',
  Dessert: 'Desserts',
};
