export type Recipe = {
  id?: string;
  title: string;
  details?: string | null;
  type: RecipeType;
};

export type RecipeType = 'entree' | 'plat' | 'dessert';

export const RecipeType = {
  Entrees: 'entree',
  Plats: 'plat',
  Desserts: 'dessert',
};

export function getType(type: string) {
  switch (type) {
    case 'entrees':
      return RecipeType.Entrees as RecipeType;
    case 'plats':
      return RecipeType.Plats as RecipeType;
    case 'desserts':
      return RecipeType.Desserts as RecipeType;
    default:
      throw new Error('Invalid type');
  }
}
