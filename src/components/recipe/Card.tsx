import { Recipe } from '@prisma/client';
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui';
import { cn } from '@/lib/utils';

interface RecipeProps {
  recipe: Recipe;
}

export default function RecipeCard(props: RecipeProps) {
  const { recipe } = props;
  return (
    <Card key={recipe.id} className="w-[310px]">
      <CardHeader className={cn('h-20')}>
        <CardTitle className="text-ellipsis text-wrap text-md">
          {recipe.title}
        </CardTitle>
      </CardHeader>
      <CardContent>{/* <p>{recipe.details}</p> */}</CardContent>
      <CardFooter className="flex justify-end">
        <p className="text-sm just text-gray-500">{recipe.type}</p>
      </CardFooter>
    </Card>
  );
}
