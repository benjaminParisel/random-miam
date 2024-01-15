import { DataTable } from '@/components/table/Data-table';
import { getServerAuthSession } from '@/server/auth';
import { getAllRecipesWith } from '@/server/recipes/recipe';
import { columns } from '../Columns';
import { getType } from '@/types/recipe';

export default async function listType({
  params,
}: {
  params: { typeId: string };
}) {
  const { typeId } = params;
  const authSession = await getServerAuthSession();
  const type = getType(typeId);
  const recipes = await getAllRecipesWith(type);

  return (
    <div className="flex max-x-screen min-h-screen flex-col items-center p-12">
      {authSession && (
        <div className="flex items-center justify-center w-auto">
          <DataTable data={recipes} columns={columns} />
        </div>
      )}
      {!authSession && <div>Please login</div>}
      <p className="mt-10 text-xl text-primary">Bon appétit !</p>
    </div>
  );
}
