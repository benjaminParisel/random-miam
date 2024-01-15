import RecipesCards from '@/components/recipe/recipesCards';
import { DataTable } from '@/components/table/Data-table';
import { getServerAuthSession } from '@/server/auth';
import { getAllRecipesWith } from '@/server/recipes/recipe';
import { RecipeType, getType } from '@/types/recipe';
import { columns } from '../Columns';

export default async function listType({
  params,
}: {
  params: { typeId: string };
}) {
  const { typeId } = params;
  const authSession = await getServerAuthSession();
  // TODO: Remove when type is only in lowercase in DB
  //   const type = typeId[0].toUpperCase() + typeId.slice(1);
  console.log(typeId);

  const recipes = await getAllRecipesWith(getType(typeId));

  return (
    <div className="flex max-x-screen min-h-screen flex-col items-center p-12">
      {authSession && <DataTable data={recipes} columns={columns} />}
      {!authSession && <div>Please login</div>}
      <p className="mt-10 text-xl text-primary">Bon appétit !</p>
    </div>
  );
}
