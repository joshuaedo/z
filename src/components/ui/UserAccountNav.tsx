'use client';

import React, { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './DropDownMenu';
import UserAvatar from './UserAvatar';
import { signOut } from 'next-auth/react';
import { MoreVertical } from 'lucide-react';
import { Session } from 'next-auth';

interface UserAccountNavProps {
  session: Session | null;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ session }) => {
  const zUser = session?.user;

  return (
    <>
      <div className='flex items-center justify-between'>
        <UserAvatar
          className='h-11 w-11'
          user={{
            name: zUser?.name || null,
            image: zUser?.image || null,
          }}
        />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-4 w-4' />
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
      </div>

      <div className='flex flex-col space-y-1 leading-none'>
        {zUser?.name && <p className='font-medium'>{zUser.name}</p>}
        {zUser?.username && (
          <p className='w-[200px] truncate text-sm text-zinc-700'>
            {`u/${zUser.username}`}
          </p>
        )}
      </div>
    </>
  );
};

export default UserAccountNav;
