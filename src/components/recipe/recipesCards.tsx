import { Recipe } from '@prisma/client';
import RecipeCard from './Card';

interface RecipeListProps {
  recipes: Recipe[];
}

export default function RecipesCards(props: RecipeListProps) {
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {props.recipes.map(
        (recipe) =>
          recipe && <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
      )}
    </div>
  );
}
