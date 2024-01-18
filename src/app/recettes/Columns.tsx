'use client';
import { Column, ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Recipe } from '@/types/recipe';
import { RxCaretDown, RxCaretSort, RxCaretUp } from 'react-icons/rx';

import { recipeSchema } from '@/schema/recipe';
import AddOrEditRecipeDialog from '@/components/recipe/AddOrEditRecipe';

export const columns: ColumnDef<Recipe>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const recipe = row.original;
      return (
        <DataTableCell value={recipe?.title || ''} className={'text-left'} />
      );
    },
  },
  {
    accessorKey: 'details',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Details" />
    ),
    cell: ({ row }) => {
      const recipe = row.original;
      return (
        <DataTableCell value={recipe?.details || ''} className={'text-left'} />
      );
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const recipe = row.original;
      return (
        <DataTableCell value={recipe?.type || ''} className={'text-left'} />
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const recipe = recipeSchema.parse(row.original);
      return <AddOrEditRecipeDialog recipe={recipe} />;
    },
  },
];

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>{title}</span>
        {column.getIsSorted() === 'desc' ? (
          <RxCaretDown className="ml-2 size-4" />
        ) : column.getIsSorted() === 'asc' ? (
          <RxCaretUp className="ml-2 size-4" />
        ) : (
          <RxCaretSort className="ml-2 size-4" />
        )}
      </Button>
    </div>
  );
}

interface DataTableCellProps {
  value: string;
  className: string;
}

export function DataTableCell({ value, className }: DataTableCellProps) {
  return <div className={className}>{value}</div>;
}
