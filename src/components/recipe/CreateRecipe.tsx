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
import { useRouter } from 'next/navigation';
import { recipeSchemaType, recipeSchema } from '@/schema/recipe';
import { createRecipe } from '@/server/recipes/recipe';
import { RecipeType, getType } from '@/types/recipe';
import { RxPlusCircled } from 'react-icons/rx';
import { useState } from 'react';

function CreateRecipeBtn({ typeId }: { typeId: RecipeType }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const type = getType(typeId);

  const recipeForm = useForm<recipeSchemaType>({
    resolver: zodResolver(recipeSchema),
    defaultValues: { details: '', type: type },
  });

  async function onSubmit(values: recipeSchemaType) {
    try {
      await createRecipe(values);
      toast({
        title: 'Succès',
        description: 'Recette ajouté avec succès.',
        variant: 'success',
      });
      setOpen(false);
      recipeForm.reset();
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="group flex flex-row items-center justify-center gap-2"
        >
          <RxPlusCircled className="size-6 text-muted-foreground group-hover:text-primary" />
          <p className="font-bold text-muted-foreground group-hover:text-primary">
            Ajouter
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une recette</DialogTitle>
          <DialogDescription>
            Ajouter une recette de type {typeId}
          </DialogDescription>
        </DialogHeader>
        <Form {...recipeForm}>
          <form
            onSubmit={recipeForm.handleSubmit(onSubmit)}
            className="space-y-2"
          >
            <FormField
              control={recipeForm.control}
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
              control={recipeForm.control}
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
            <DialogFooter>
              <DialogFooter>
                <Button
                  onClick={() => recipeForm.handleSubmit(onSubmit)}
                  disabled={recipeForm.formState.isSubmitting}
                  className="mt-4 w-full"
                >
                  {!recipeForm.formState.isSubmitting && (
                    <span>Sauvegarder</span>
                  )}
                  {recipeForm.formState.isSubmitting && (
                    <ImSpinner2 className="animate-spin" />
                  )}
                </Button>
              </DialogFooter>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateRecipeBtn;
