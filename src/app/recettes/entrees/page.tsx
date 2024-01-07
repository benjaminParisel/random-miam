import { getAllRecipesWith } from '@/server/recipes/recipe';
import { RecipeType } from '@/types/recipe';
import { getServerAuthSession } from '@/server/auth';
import RecipesCards from '@/components/recipe/recipesCards';

export default async function Recipes() {
  const authSession = await getServerAuthSession();
  const starters = await getAllRecipesWith(RecipeType.Entree);

  return (
    <div className="flex max-x-screen min-h-screen flex-col items-center p-12">
      {authSession && (
        <>
          <RecipesCards recipes={starters}></RecipesCards>
        </>
      )}
      {!authSession && <div>Please login</div>}
    </div>
  );
}
