'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { getNavigationRecipeFrom } from '@/app/NavigationLink';
import { recipeSchemaType, recipeSchema } from '@/schema/recipe';
import { createRecipe } from '@/server/recipes/recipe';
import { RxCross1, RxPlus } from 'react-icons/rx';
import { RecipeType, getType } from '@/types/recipe';

function CreateRecipeBtn({ params }: { params: { typeId: string } }) {
  const router = useRouter();

  const recipe = useForm<recipeSchemaType>({
    resolver: zodResolver(recipeSchema),
    defaultValues: { type: getType(params.typeId) as RecipeType },
  });
  console.log('params', params.typeId);

  async function onSubmit(values: recipeSchemaType) {
    try {
      console.log('values', values);
      const recipe = await createRecipe(values);
      toast({
        title: 'Succès',
        description: 'Recette ajouté avec succès.',
        variant: 'success',
      });
      router.push(`/recettes/${getNavigationRecipeFrom(recipe.type)}`, {});
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue, veuillez réessayer plus tard.',
        variant: 'destructive',
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="group flex flex-col items-center justify-center gap-4 border border-primary/20 bg-primary hover:cursor-pointer hover:border-primary"
        >
          <RxPlus className="size-8 text-muted-foreground group-hover:text-primary" />
          <p className="text-xl font-bold text-muted-foreground group-hover:text-primary">
            Ajouter une recette
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <Form {...recipe}>
          <form onSubmit={recipe.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={recipe.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={recipe.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={recipe.control}
              name="type"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={recipe.handleSubmit(onSubmit)}
            disabled={recipe.formState.isSubmitting}
            className="mt-4 w-full"
          >
            {!recipe.formState.isSubmitting && <span>Save</span>}
            {recipe.formState.isSubmitting && (
              <ImSpinner2 className="animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateRecipeBtn;
