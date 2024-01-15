import { DataTable } from '@/components/table/Data-table';
import { getServerAuthSession } from '@/server/auth';
import { getAllRecipesWith } from '@/server/recipes/recipe';
import { columns } from '../Columns';
import { getType } from '@/types/recipe';
import { DialogHeader, DialogFooter } from '@/components/ui/dialog';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@radix-ui/react-dialog';
import CreateRecipeBtn from '@/components/recipe/CreateRecipe';

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
    <div className="flex min-h-screen flex-col items-center p-12">
      {authSession && (
        <div className="flex w-auto flex-col items-end justify-center bg-fuchsia-200">
          <CreateRecipeBtn params={{ typeId }} />
          <DataTable data={recipes} columns={columns} />
        </div>
      )}
      {!authSession && <div>Please login</div>}
      <p className="mt-10 text-xl text-primary">Bon appétit !</p>
    </div>
  );
}
