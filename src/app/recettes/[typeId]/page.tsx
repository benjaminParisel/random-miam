import { DataTable } from '@/components/table/Data-table';
import { getServerAuthSession } from '@/server/auth';
import { getAllRecipesWith } from '@/server/recipes/recipe';
import { columns } from '../Columns';
import { RecipeType, getType } from '@/types/recipe';

import { DataTablePagination } from '@/components/table/TablePagination';
import AddOrEditRecipeDialog from '@/components/recipe/AddOrEditRecipe';

export default async function listType({
  params,
}: {
  params: { typeId: string };
}) {
  const typeId = params.typeId as RecipeType;
  const authSession = await getServerAuthSession();
  const type = getType(typeId);
  const recipes = await getAllRecipesWith(type);

  return (
    <div className="flex min-h-screen w-full flex-col p-12">
      {authSession && (
        <div className="flex flex-col justify-center">
          <div className="flex flex-col items-end">
            <AddOrEditRecipeDialog typeId={type} />
          </div>

          <DataTable data={recipes} columns={columns} />
          {/* <DataTablePagination table={recipes} /> */}
        </div>
      )}
      {!authSession && <div>Please login</div>}
    </div>
  );
}
