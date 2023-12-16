'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavIcons } from './NavIcons';

const MobileNavClient = () => {
  const pathname = usePathname();
  return (
    <>
      <Link
        href='/'
        className='flex items-end text-xl font-medium py-1 p-2 rounded-lg'
      >
        {pathname === '/' ? (
          <NavIcons.homeActive className='h-6 w-6' />
        ) : (
          <NavIcons.homeInactive className='h-6 w-6' />
        )}
      </Link>

      <Link
        href='/communities'
        className='flex items-end text-xl font-medium py-1 p-2 rounded-lg'
      >
        {pathname === '/communities' ? (
          <NavIcons.communityActive className='h-6 w-6' />
        ) : (
          <NavIcons.communityInactive className='h-6 w-6' />
        )}
      </Link>

      <Link
        href='/explore'
        className='flex items-end text-xl font-medium py-1 pr-2 rounded-lg'
      >
        {pathname === '/explore' ? (
          <NavIcons.exploreActive className='h-6 w-6' />
        ) : (
          <NavIcons.exploreInactive className='h-6 w-6' />
        )}
      </Link>

      <Link
        href='/notifications'
        className='flex items-end text-xl font-medium py-1 pr-2 rounded-lg'
      >
        {pathname === '/notifications' ? (
          <NavIcons.notificationsActive className='h-6 w-6' />
        ) : (
          <NavIcons.notificationsInactive className='h-6 w-6' />
        )}
      </Link>
    </>
  );
};

export default MobileNavClient;
