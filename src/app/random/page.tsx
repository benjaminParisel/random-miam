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
                  <Card key={recipe.id} className="w-[310px]">
                    <CardHeader>
                      <CardTitle className="text-ellipsis text-wrap text-md">
                        {recipe.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{recipe.details}</p>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm text-gray-500">{recipe.type}</p>
                    </CardFooter>
                  </Card>
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
