'use client';
import { User } from 'next-auth';
import React, { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/DropDownMenu';
import UserAvatar from './UserAvatar';
import { signOut } from 'next-auth/react';
import { MoreVertical } from 'lucide-react';

interface UserAccountNavProps {
  user: Pick<User, 'name' | 'image' | 'email'>;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <>
        <UserAvatar
          className='h-8 w-8'
          user={{
            name: user.name || null,
            image: user.image || null,
          }}
        />

        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user.name && <p className='font-medium'>{user.name}</p>}
            {user.email && (
              <p className='w-[200px] truncate text-sm text-zinc-700'>
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
             <MoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
             <DropdownMenuItem
               onSelect={(e) => {
               e.preventDefault();
               signOut({
                  callbackUrl: `${window.location.origin}/sign-in`,
               });
              }}
             className='cursor-pointer'
            >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
       </DropdownMenu> 
    </>
  );
};

export default UserAccountNav;
