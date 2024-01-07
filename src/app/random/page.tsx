import { getAllRecipesWith } from '@/server/recipes/recipe';
import { RecipeType } from '@/types/recipe';
import { getRandomItemFromArray } from '@/server/recipes/utils';
import { getServerAuthSession } from '@/server/auth';
import RecipeCard from '@/components/recipe/Card';

export default async function Random() {
  const authSession = await getServerAuthSession();

  const starters = await getAllRecipesWith(RecipeType.Entree);
  const main = await getAllRecipesWith(RecipeType.Plat);
  const desserts = await getAllRecipesWith(RecipeType.Dessert);

  const recipes = [
    getRandomItemFromArray(starters),
    getRandomItemFromArray(main),
    getRandomItemFromArray(desserts),
  ];

  return (
    <div className="flex max-x-screen min-h-screen flex-col items-center p-12">
      {authSession && (
        <>
          <div className="flex gap-4 flex-wrap justify-center">
            {recipes.map(
              (recipe) =>
                recipe && (
                  <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
                )
            )}
          </div>
        </>
      )}
      {!authSession && <div>Please login</div>}
      <p className="mt-10 text-xl text-primary">Bon appétit !</p>
    </div>
  );
}
