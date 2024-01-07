import { getAllRecipesWith } from '@/server/recipes/recipe';
import { RecipeType } from '@/types/recipe';
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

  const main = await getAllRecipesWith(RecipeType.Plat);

  return (
    <div className="flex max-x-screen min-h-screen flex-col items-center p-12">
      {authSession && (
        <>
          <RecipesCards recipes={main}></RecipesCards>
        </>
      )}
      {!authSession && <div>Please login</div>}
      <p className="mt-10 text-xl text-primary">Bon appétit !</p>
    </div>
  );
}
