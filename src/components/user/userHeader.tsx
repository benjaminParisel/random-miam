'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DefaultUser } from 'next-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { User } from 'lucide-react';

type UserHeaderProps = { user: DefaultUser };

export default function userHeader(props: UserHeaderProps) {
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-row items-center text-gray-400">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${props.user.name}`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="font-bold">{props.user.name}</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <Link href="/myAccount">Mon compte</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DropdownMenuLabel onClick={handleLogout}>
              Se déconnecter
            </DropdownMenuLabel>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
