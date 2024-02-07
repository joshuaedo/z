'use client';

import { usePathname, useRouter } from 'next/navigation';
import { NavIcons } from './NavIcons';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/Button';

const IconWrapper = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const router = useRouter();
  return (
    <div
      className={cn(
        buttonVariants({
          variant: 'subtle',
          size: 'icon',
        }),
        'cursor-pointer'
      )}
      onClick={() => router.push(href)}
    >
      {children}
    </div>
  );
};

const MobileNav = () => {
  const pathname = usePathname();
  const isChatPage = pathname.includes('/messages/u/');

  return isChatPage ? (
    <div />
  ) : (
    <nav className='inline md:hidden fixed bottom-0 inset-x-0 h-[4rem] bg-zinc-100 dark:bg-[#000000] border-t border-zinc-300 dark:border-[#333333] z-[60]'>
      <div className='container h-full flex items-center justify-between px-8 relative'>
        <>
          <IconWrapper href='/'>
            {pathname === '/' ? (
              <NavIcons.homeActive className='h-6 w-6' />
            ) : (
              <NavIcons.homeInactive className='h-6 w-6' />
            )}
          </IconWrapper>

          <IconWrapper href='/communities'>
            {pathname === '/communities' ? (
              <NavIcons.communityActive className='h-6 w-6' />
            ) : (
              <NavIcons.communityInactive className='h-6 w-6' />
            )}
          </IconWrapper>

          <IconWrapper href='/explore'>
            {pathname === '/explore' ? (
              <NavIcons.exploreActive className='h-6 w-6' />
            ) : (
              <NavIcons.exploreInactive className='h-6 w-6' />
            )}
          </IconWrapper>

          <IconWrapper href='/notifications'>
            {pathname === '/notifications' ? (
              <NavIcons.notificationsActive className='h-6 w-6' />
            ) : (
              <NavIcons.notificationsInactive className='h-6 w-6' />
            )}
          </IconWrapper>

          <IconWrapper href='/messages'>
            {pathname === '/messages' ? (
              <NavIcons.messagesActive className='h-6 w-6' />
            ) : (
              <NavIcons.messagesInactive className='h-6 w-6' />
            )}
          </IconWrapper>
        </>
      </div>
    </nav>
  );
};

export default MobileNav;
