import { getAllRecipesWith } from '@/server/recipes/recipe';
import { RecipeType } from '@/types/recipe';
import { getRandomItemFromArray } from '@/server/recipes/utils';
import { getServerAuthSession } from '@/server/auth';
import RecipeCard from '@/components/recipe/Card';

export default async function Random() {
  const authSession = await getServerAuthSession();

  const starters = await getAllRecipesWith(RecipeType.Entrees);
  const main = await getAllRecipesWith(RecipeType.Plats);
  const desserts = await getAllRecipesWith(RecipeType.Desserts);

  const recipes = [
    getRandomItemFromArray(starters),
    getRandomItemFromArray(main),
    getRandomItemFromArray(desserts),
  ];

  return (
    <div className="flex min-h-screen flex-col items-center p-12">
      {authSession && (
        <>
          <div className="flex flex-wrap justify-center gap-4">
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
