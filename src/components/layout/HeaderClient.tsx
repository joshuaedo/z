'use client';
import Link from 'next/link';
import { Icons } from '../ui/Icons';
import { User } from 'next-auth';
import UserAvatar from '../features/user/UserAvatar';

type HeaderClientProps = {
  user: User | undefined | null;
};

const HeaderClient = ({ user }: HeaderClientProps) => {
  const displayName = user?.name;
  const displayImage = user?.image;

  return (
    <div className='flex font-semibold items-center gap-x-5 h-full w-full text-lg'>
      <UserAvatar
        className='h-6 w-6'
        user={{
          name: displayName || null,
          image: displayImage || null,
        }}
      />

      <div className='absolute left-1/2 transform -translate-x-1/2 text-center'>
        <Link href='/'>
          <Icons.logo className='h-8 w-8' />
        </Link>
      </div>
    </div>
  );
};

export default HeaderClient;
