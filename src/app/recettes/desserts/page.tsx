import { getAllRecipesWith } from '@/server/recipes/recipe';
import { Recipe, RecipeType } from '@/types/recipe';
import { getRandomItemFromArray } from '@/server/recipes/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { getServerAuthSession } from '@/server/auth';
import RecipesCards from '@/components/recipe/recipesCards';

export default async function Recipes() {
  const authSession = await getServerAuthSession();

  const desserts = await getAllRecipesWith(RecipeType.Dessert);

  return (
    <div className="flex max-x-screen min-h-screen flex-col items-center p-12">
      {authSession && (
        <>
          <RecipesCards recipes={desserts}></RecipesCards>
        </>
      )}
      {!authSession && <div>Please login</div>}
    </div>
  );
}
