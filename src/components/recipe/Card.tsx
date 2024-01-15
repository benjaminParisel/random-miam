import { Recipe } from '@prisma/client';
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui';
import { CiCircleRemove, CiEdit } from 'react-icons/ci';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { CardDescription } from '../ui/card';

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
        <CardDescription className="flex items-center justify-end text-muted-foreground text-sm">
          {recipe.type}
        </CardDescription>
      </CardHeader>
      <CardContent>{/* <p>{recipe.details}</p> */}</CardContent>
      <CardFooter className="flex items-center justify-center gap-5 text-muted-foreground">
        <Link href={`/recettes/${recipe.type.toLowerCase()}/${recipe.id}`}>
          {' '}
          <CiEdit className="text-muted-foreground" />
        </Link>
        <Link href={`/recettes/${recipe.type.toLowerCase()}/${recipe.id}`}>
          {' '}
          <CiCircleRemove className="text-muted-foreground" />
        </Link>
      </CardFooter>
    </Card>
  );
}
