import { Home, Search, Users } from 'lucide-react';
import Link from 'next/link';
import UserAvatar from '../UserAvatar';
import { getAuthSession } from '@/lib/auth';

const MobileNav = async () => {
  const session = await getAuthSession();
  const zUser = session?.user;

  return (
    <nav className='inline md:hidden fixed bottom-0 inset-x-0 h-fit bg-zinc-100 border-t border-zinc-300 z-[10] py-4'>
      <div className='container h-full flex items-center justify-between px-4 relative'>
        <Link
          href='/'
          className='flex items-end text-xl font-medium py-1 pr-2 rounded-lg'
        >
          <Home strokeWidth={1.7} className='h-6 w-6' />
        </Link>

        <Link
          href='/communities'
          className='flex items-end text-xl font-medium py-1 pr-2 rounded-lg'
        >
          <Users strokeWidth={1.7} className='h-6 w-6' />
        </Link>

        <Link
          href='/explore'
          className='flex items-end text-xl font-medium py-1 pr-2 rounded-lg'
        >
          <Search strokeWidth={1.7} className='h-6 w-6' />
        </Link>

        <Link
          href='/profile'
          className='flex items-end text-xl font-medium py-1 pr-2 rounded-lg'
        >
          <UserAvatar
            className='h-6 w-6'
            user={{
              name: zUser?.name || null,
              image: zUser?.image || null,
            }}
          />
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
