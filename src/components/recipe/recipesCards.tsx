import { Recipe } from '@prisma/client';
import RecipeCard from './Card';

interface RecipeListProps {
  recipes: Recipe[];
}

export default function RecipesCards(props: RecipeListProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {props.recipes.map(
        (recipe) =>
          recipe && <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
      )}
    </div>
  );
}
