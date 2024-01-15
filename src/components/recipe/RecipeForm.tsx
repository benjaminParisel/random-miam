'use client';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  createRecipe,
  getRecipeById,
  updateRecipe,
} from '@/server/recipes/recipe';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RecipeType } from '@/types/recipe';
import { Label } from '@/components/ui/label';
import { Recipe } from '@prisma/client';
import { recipeSchema, recipeSchemaType } from '@/schema/recipe';

interface RecipeFormProps {
  recipe?: recipeSchemaType;
}

const RecipeForm: React.FC<RecipeFormProps> = (props: RecipeFormProps) => {
  const router = useRouter();
  console.log('recipe', props.recipe?.title);
  const recipe = recipeSchema.parse(props.recipe);
  const { id, title, type } = recipe;
  const details = recipe.details || '';
  const isEditing = Boolean(recipe.id);

  const [formTitle, setformTitle] = useState<string>('');
  const [formDetails, setFormDetails] = useState<string>('');
  const [formType, setFormType] = useState<string>(type || '');

  useEffect(() => {
    // If editing, fetch the recipe details and populate the form
    const fetchRecipe = async () => {
      if (isEditing && id) {
        const fetchedRecipe = await getRecipeById(id);

        if (fetchedRecipe) {
          setformTitle(fetchedRecipe.title || '');
          setFormDetails(fetchedRecipe.details || '');
          setFormType(fetchedRecipe.type || '');
        }
      }
    };
    fetchRecipe();
  }, [id, isEditing]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const recipeData = { title, details, type };
    const recipeDataUpdate = { id, title, details, type };

    // if (isEditing && id) {
    //   await updateRecipe(recipeDataUpdate);
    // } else {
    //   await createRecipe(recipeData);
    // }

    router.push(`/recettes/${type}`); // Redirect to the recipes page after submitting
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="flex flex-col items-start justify-start gap-3">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          title="Title"
          value={title}
          onChange={(e) => setformTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-start justify-start gap-3">
        <Label htmlFor="details">Details</Label>
        <Input
          id="details"
          title="Details"
          value={details}
          onChange={(e) => setFormDetails(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-start justify-start gap-3">
        <Label htmlFor="type">Type</Label>
        <Input
          id="type"
          title="Type"
          value={type}
          onChange={(e) => setFormType(e.target.value)}
        />
      </div>
      <Button type="submit">
        {isEditing ? 'Update Recipe' : 'Create Recipe'}
      </Button>
    </form>
  );
};

export default RecipeForm;
