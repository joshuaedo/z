"use client"

import { Home, Search, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileNavClient = () => {
    const pathname = usePathname();
  return ( <>
       <Link
          href='/'
          className='flex items-end text-xl font-medium py-1 pr-2 rounded-lg'
        >
          <Home strokeWidth={pathname === "/" ? 2.3 : 1.6} className='h-6 w-6' />
        </Link>

        <Link
          href='/communities'
          className='flex items-end text-xl font-medium py-1 p-2 rounded-lg'
        >
          <Users strokeWidth={pathname === "/communities" ? 2.3 : 1.6} className='h-6 w-6' />
        </Link>

        <Link
          href='/explore'
          className='flex items-end text-xl font-medium py-1 pr-2 rounded-lg'
        >
          <Search strokeWidth={pathname === "/explore" ? 2.3 : 1.6} className='h-6 w-6' />
        </Link>
    </>
 )
}

export default MobileNavClient;