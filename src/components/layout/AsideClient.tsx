'use client';
import { Icons } from '../ui/Icons';
import UserAccountNav from '../ui/UserAccountNav';
import { Button, buttonVariants } from '../ui/Button';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';
import { Community, User } from '@prisma/client';
import { Session } from 'next-auth';
import Link from 'next/link';
import CommunityAvatar from '../community/CommunityAvatar';
import { ThemeToggle } from '../ui/ThemeToggle';
import { NavIcons } from './NavIcons';
import { Plus } from 'lucide-react';

interface AsideClientProps {
  session: Session | null;
  subs: Community[];
  user: User | null;
}

const AsideClient: FC<AsideClientProps> = ({ session, subs, user }) => {
  const router = useRouter();
  const pathname = usePathname();
  const zUser = user ?? session?.user;

  return (
    <aside className='overflow-hidden h-fit rounded-lg md:bg-white dark:md:bg-[#000000] md:shadow dark:md:border border-[#333333] md:fixed p-8 space-y-2'>
      <div
        onClick={() => router.push('/')}
        className='cursor-pointer hidden md:flex items-center'
      >
        <Icons.logo className='h-8 w-8 md:h-10 md:w-10' />
      </div>

      <Button
        variant='ghost'
        onClick={() => router.push('/')}
        className={`${
          pathname === '/' ? 'font-bold' : 'font-medium'
        } hidden md:flex text-xl items-end -ml-3 mb-4 `}
      >
        {pathname === '/' ? (
          <NavIcons.homeActive className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        ) : (
          <NavIcons.homeInactive className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        )}
        Home
      </Button>

      <Button
        variant='ghost'
        onClick={() => router.push('/communities')}
        className={`${
          pathname === '/communities' ? 'font-bold' : 'font-medium'
        } hidden md:flex text-xl items-end -ml-3 mb-4 `}
      >
        {pathname === '/communities' ? (
          <NavIcons.communityActive className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        ) : (
          <NavIcons.communityInactive className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        )}
        Communities
      </Button>

      <Button
        variant='ghost'
        onClick={() => router.push('/explore')}
        className={`${
          pathname === '/explore' ? 'font-bold' : 'font-medium'
        } hidden md:flex text-xl items-end -ml-3 mb-4 `}
      >
        {pathname === '/explore' ? (
          <NavIcons.exploreActive className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        ) : (
          <NavIcons.exploreInactive className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        )}
        Explore
      </Button>

      <Button
        variant='ghost'
        onClick={() => router.push('/notifications')}
        className={`${
          pathname === '/notifications' ? 'font-bold' : 'font-medium'
        } hidden md:flex text-xl items-end -ml-3 mb-4 `}
      >
        {pathname === '/notifications' ? (
          <NavIcons.notificationsActive className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        ) : (
          <NavIcons.notificationsInactive className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        )}
        Notifications
      </Button>

      <Button
        variant='ghost'
        onClick={() => router.push(`/u/${zUser?.username}`)}
        className={`${
          pathname === `/u/${zUser?.username}` ? 'font-bold' : 'font-medium'
        } hidden md:flex text-xl items-end -ml-3 mb-4`}
      >
        {pathname === `/u/${zUser?.username}` ? (
          <NavIcons.profileActive className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        ) : (
          <NavIcons.profileInactive className='h-5 w-5 md:h-7 md:w-7 mr-3' />
        )}
        Profile
      </Button>

      <hr className='hidden md:flex' />

      {zUser ? (
        <Link className='flex flex-col' href={'/u/' + zUser?.username}>
          <UserAccountNav user={user} />
        </Link>
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
              className='text-muted-foreground flex'
            >
              <Plus className='mr-2' />
              <span>Create a community</span>
            </button>
            <ul
              id='aside-communities'
              className='text-muted-foreground max-h-[10rem] space-y-1'
            >
              {subs.map((community) => (
                <li
                  key={community.id}
                  onClick={() => router.push(`z/${community.name}`)}
                  className='py-1 flex gap-x-2 cursor-pointer overflow-hidden'
                >
                  <CommunityAvatar community={community} className='h-5 w-5' />
                  {`z/${
                    community.name.length > 13
                      ? community.name.slice(0, 13) + '...'
                      : community.name
                  }`}
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
        {/* <button
          onClick={() => router.push("/support")}
          className="block text-xs font-medium rounded-lg"
        >
          Support
        </button> */}
      </div>

      <ThemeToggle />
    </aside>
  );
};

export default AsideClient;
