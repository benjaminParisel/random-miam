export type Recipe = {
  id?: string;
  title?: string;
  details?: string | null;
  type: RecipeType;
};

export type RecipeType = 'entree' | 'plat' | 'dessert';

export const RecipeType = {
  Entrees: 'entree',
  Plats: 'plat',
  Dessert: 'dessert',
};

export function getType(type: string) {
  switch (type) {
    case 'entrees':
      return RecipeType.Entrees;
    case 'plats':
      return RecipeType.Plats;
    case 'desserts':
      return RecipeType.Dessert;
    default:
      return '';
  }
}
