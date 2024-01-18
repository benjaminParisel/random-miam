import AddOrEditRecipeForm from '@/components/recipe/CreateEditRecipe';
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
    <div className="mx-auto flex w-full flex-col items-center justify-center">
      <div>Details bout Recipe {id}</div>
      <div className={'flex items-center justify-center'}>
        <AddOrEditRecipeForm recipe={recipe} />
      </div>
    </div>
  );
}
