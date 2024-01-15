'use client';

import { useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { recipeSchema, recipeSchemaType } from '@/schema/recipe';
import { updateRecipe } from '@/server/recipes/recipe';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { getNavigationRecipeFrom } from '@/app/NavigationLink';
import { useEffect } from 'react';

interface RecipeFormProps {
  recipe?: recipeSchemaType;
}

function AddOrEditRecipeForm(props: RecipeFormProps) {
  const router = useRouter();
  const isEdit = !!props.recipe;
  const initialType = getNavigationRecipeFrom(props.recipe?.type || '');
  const recipe = useForm<recipeSchemaType>({
    resolver: zodResolver(recipeSchema),
    defaultValues: props.recipe || {},
  });

  async function onSubmit(values: recipeSchemaType) {
    try {
      const recipeId = await updateRecipe(values);
      toast({
        title: 'Succès',
        description: 'Recette mise à jour avec succès.',
        variant: 'success',
      });
      router.push(`/recettes/${initialType}`, {});
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

  useEffect(() => {
    router.prefetch(`/recettes/${initialType}`);
  }, [router, initialType]);

  return (
    <div>
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>{field.value}</FormLabel>
                <Select defaultValue={field.value} disabled={isEdit}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Choisi le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entree">Entree</SelectItem>
                    <SelectItem value="plat">Plat</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

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
    </div>
  );
}

export default AddOrEditRecipeForm;
