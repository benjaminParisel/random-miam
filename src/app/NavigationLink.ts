import { RecipeType } from '@/types/recipe';

export const navigation = [
  { name: 'Random', href: '/random' },
  { name: 'Entrees', href: '/recettes/entrees' },
  { name: 'Plats', href: '/recettes/plats' },
  { name: 'Desserts', href: '/recettes/desserts' },
];

export function getNavigationRecipeFrom(type: string) {
  switch (type) {
    case RecipeType.Entrees:
      return 'entrees';
    case RecipeType.Plats:
      return 'plats';
    case RecipeType.Desserts:
      return 'desserts';
    default:
      return '';
  }
}
