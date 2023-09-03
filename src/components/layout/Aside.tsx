import Link from 'next/link';
import { Icons } from '../Icons';
import { Home, UserCircle, Search, Users, Plus } from 'lucide-react';
import { getAuthSession } from '@/lib/auth';
import UserAccountNav from '../UserAccountNav';
import { buttonVariants } from '../ui/Button';
import { db } from '@/lib/db';
import { Community } from '@prisma/client';

const Aside = async () => {
  const session = await getAuthSession();
  const zUser = session?.user;
  
  let subs: Community[] = [];
  
  if (zUser) {
    // Fetch user's subscriptions using Prisma
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: zUser.id,
      },
      include: {
        community: true,
      },
    });

    // Extract community names from the subscriptions
    const communityNames = followedCommunities.map(({ community }) => community.name);

    // Fetch community data based on names
    subs = await db.community.findMany({
      where: {
        name: {
          in: communityNames,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }



  return (
    <aside className='overflow-hidden h-fit rounded-lg md:shadow md:fixed px-10 py-8 space-y-4 bg-white'>
      <Link href='/' className='hidden md:flex items-center'>
        <Icons.logo className='-ml-2 h-8 w-8 md:h-10 md:w-10' />
      </Link>

      <Link
        href='/'
        className='hidden md:flex items-end text-xl font-medium py-1 pr-2 rounded-lg'
      >
        <Home strokeWidth={1.5} className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        Home
      </Link>

      <Link
        href='/communities'
        className='hidden md:flex items-end text-xl font-medium py-1 pr-2 rounded-lg'
      >
        <Users strokeWidth={1.5} className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        Communities
      </Link>

      <Link
        href='/explore'
        className='hidden md:flex items-end text-xl font-medium py-1 pr-2 rounded-lg'
      >
        <Search strokeWidth={1.5} className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        Explore
      </Link>

      <Link
        href='/profile'
        className='hidden md:flex items-end text-xl font-medium py-1 pr-2 rounded-lg'
      >
        <UserCircle strokeWidth={1.5} className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        Profile
      </Link>

      <hr className='hidden md:flex' />

      {zUser ? (
        <UserAccountNav user={zUser} />
      ) : (
        <Link
          href='/sign-in'
          className={buttonVariants({
            variant: 'default',
            size: 'lg',
          })}
        >
          Sign In
        </Link>
      )}

      <hr />

      { zUser && (
          <>
             <div className='md:hidden space-y-3'>
        <h4 className='font-medium'>Your  Communities</h4>
        <Link href="/z/create" className='text-zinc-600 flex'>
            <Plus className='mr-2' />
            <span>Create a community</span>
        </Link>
        <ul id='aside-communities' className='text-zinc-600 max-h-[10rem] space-y-2'>
        {/* Map over the user's subscribed communities and generate the list */}
          {subs.map((community) => (
            <li key={community.id}>
              <Link href={`z/${community.name}`} className=''>{`z/${community.name}`}</Link>
            </li>
          ))}
        </ul>
      </div>

      <hr className='md:hidden' />
          </>           
        ) 
      }

      <div className='space-y-1'>
        <Link
          href='/privacy-policy'
          className='block text-xs font-medium rounded-lg'
        >
          Privacy Policy
        </Link>
        <Link
          href='/terms-of-service'
          className='block text-xs font-medium rounded-lg'
        >
          Terms of Service
        </Link>
        <Link href='/support' className='block text-xs font-medium rounded-lg'>
          Support
        </Link>
      </div>
    </aside>
  );
};

export default Aside;
