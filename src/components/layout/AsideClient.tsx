'use client';
import { Icons } from '../Icons';
import { Home, UserCircle, Search, Users, Plus } from 'lucide-react';
import UserAccountNav from '../UserAccountNav';
import { buttonVariants } from '../ui/Button';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';
import { Community } from '@prisma/client';
import { Session } from 'next-auth';


interface AsideClientProps {
  session: Session | null
  subs: Community[];
}

const AsideClient: FC<AsideClientProps> = ({ session, subs }) => {
  const router = useRouter();
  const pathname = usePathname();
  const zUser = session?.user;

  return (
    <aside className='overflow-hidden h-fit rounded-lg md:shadow md:fixed px-10 py-8 space-y-4 bg-white'>
      <button
        onClick={() => router.push('/')}
        className='hidden md:flex items-center'
      >
        <Icons.logo className='-ml-2 h-8 w-8 md:h-10 md:w-10' />
      </button>

      <button
        onClick={() => router.push('/')}
        className={`${pathname === "/" ? "font-bold" : "font-medium"} hidden md:flex items-end text-xl py-1 pr-2 rounded-lg hover:bg-[#F8FAFC]`}
      >
        <Home strokeWidth={pathname === "/" ? 2 : 1.5} className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        Home
      </button>

      <button
        onClick={() => router.push('/communities')}
        className={`${pathname === "/communities" ? "font-bold" : "font-medium"} hidden md:flex items-end text-xl py-1 pr-2 rounded-lg hover:bg-[#F8FAFC]`}
      >
        <Users strokeWidth={pathname === "/communities" ? 2 : 1.5} className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        Communities
      </button>

      <button
        onClick={() => router.push('/explore')}
        className={`${pathname === "/explore" ? "font-bold" : "font-medium"} hidden md:flex items-end text-xl py-1 pr-2 rounded-lg hover:bg-[#F8FAFC]`}
      >
        <Search strokeWidth={pathname === "/explore" ? 2 : 1.5} className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        Explore
      </button>

      <button
        onClick={() => router.push('/profile')}
        className={`${pathname === "/profile" ? "font-bold" : "font-medium"} hidden md:flex items-end text-xl py-1 pr-2 rounded-lg hover:bg-[#F8FAFC]`}
      >
        <UserCircle strokeWidth={pathname === "/profile" ? 2 : 1.5} className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        Profile
      </button>

      <hr className='hidden md:flex' />

      {zUser ? (
        <UserAccountNav user={zUser} />
      ) : (
        <button
          onClick={() => router.push('/sign-in')}
          className={buttonVariants({
            variant: 'default',
            size: 'lg',
          })}
        >
          Sign In
        </button>
      )}

      <hr />

      {zUser && (
        <>
          <div className='md:hidden space-y-3'>
            <h4 className='font-medium'>Your Communities</h4>
            <button
              onClick={() => router.push('/z/create')}
              className='text-zinc-600 flex'
            >
              <Plus className='mr-2' />
              <span>Create a community</span>
            </button>
            <ul
              id='aside-communities'
              className='text-zinc-600 max-h-[10rem] space-y-1'
            >
              {/* Map over the user's subscribed communities and generate the list */}
              {subs.map((community) => (
                <li key={community.id} onClick={() => router.push(`z/${community.name}`)} className='py-1'>
                   {`z/${community.name}`}
                </li>
              ))}
            </ul>
          </div>

          <hr className='md:hidden' />
        </>
      )}

      <div className='space-y-1'>
        <button
          onClick={() => router.push('/privacy-policy')}
          className='block text-xs font-medium rounded-lg'
        >
          Privacy Policy
        </button>
        <button
          onClick={() => router.push('/terms-of-service')}
          className='block text-xs font-medium rounded-lg'
        >
          Terms of Service
        </button>
        <button
          onClick={() => router.push('/support')}
          className='block text-xs font-medium rounded-lg'
        >
          Support
        </button>
      </div>
    </aside>
  );
};

export default AsideClient;
