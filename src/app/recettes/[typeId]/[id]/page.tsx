import RecipeForm from '@/components/recipe/RecipeForm';
import { getServerAuthSession } from '@/server/auth';
import { getRecipeById } from '@/server/recipes/recipe';
import { RecipeType } from '@/types/recipe';

interface RecipeParams {
  id: string;
  typeId: RecipeType;
}

export default async function AddOrEditRecipeRecipe(params: RecipeParams) {
  const authSession = await getServerAuthSession();
  const { id } = params;
  const recipe = await getRecipeById(id);
  return (
    <div className="flex flex-col mx-auto w-full items-center justify-center">
      <div>Details bout Recipe {id}</div>
      <div className={'flex items-center justify-center'}>
        <RecipeForm recipe={recipe} />
      </div>
    </div>
  );
}
