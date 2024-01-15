'use client';
import { Column, ColumnDef } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { CiEdit } from 'react-icons/ci';
import { Recipe } from '@/types/recipe';
import { Button } from '../../components/ui/button';
import { RxCaretDown, RxCaretSort, RxCaretUp } from 'react-icons/rx';

export const columns: ColumnDef<Recipe>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const recipe = row.original;

      return <div className="text-left"> {recipe.title}</div>;
    },
  },
  {
    accessorKey: 'details',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Details" />
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const recipe = row.original;

      return (
        <div>
          <Link href={`/recettes/${recipe.type.toLowerCase()}/${recipe.id}`}>
            <CiEdit className="text-muted-foreground" />
          </Link>
        </div>
      );
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
          <RxCaretDown className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === 'asc' ? (
          <RxCaretUp className="ml-2 h-4 w-4" />
        ) : (
          <RxCaretSort className="ml-2 h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
