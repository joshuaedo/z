' use client';
import Aside from './Aside';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/DropDownMenu';
import Link from 'next/link';
import { Icons } from '../ui/Icons';
import UserAvatar from '../features/user/UserAvatar';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '@prisma/client';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '../ui/Button';

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const displayName = user?.name;
  const displayImage = user?.image;

  const pathname = usePathname();
  const isConversationPage = pathname?.includes('messages/u/');
  const otherUsername = pathname.replace('/messages/u/', '');

  const {
    data: otherUser,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/user/get/by-username?u=${otherUsername}`
      );
      return data as User;
    },
    queryKey: ['get-user', isConversationPage],
    enabled: true,
  });

  const DefaultHeader = () => (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar
            className='h-6 w-6'
            user={{
              name: displayName || null,
              image: displayImage || null,
            }}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Aside />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className='absolute left-1/2 transform -translate-x-1/2 text-center'>
        <Link href='/'>
          <Icons.logo className='h-8 w-8' />
        </Link>
      </div>
    </>
  );

  const ConversationHeader = () => (
    <div className='flex items-center space-x-3 -ml-6'>
      <Button
        variant='subtle'
        size='icon'
        className='px-0 md:bg-transparent'
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeftIcon />
      </Button>
      <UserAvatar
        className='h-6 w-6'
        user={{
          name: otherUser?.name || null,
          image: otherUser?.image || null,
        }}
      />
      <span className='text-base font-semibold'>
        {otherUser?.displayName ?? otherUser?.name}
      </span>
    </div>
  );

  return (
    <nav
      className={`fixed top-0 h-[4rem] bg-zinc-100 dark:bg-[#000000] border-b border-zinc-300 dark:border-[#333333] z-[60] container px-8 flex items-center w-full ${
        isConversationPage
          ? 'md:static md:bg-white md:rounded-lg md:shadow'
          : 'md:hidden'
      }`}
    >
      {isConversationPage ? (
        <>
          {isFetching && <DefaultHeader />}
          {!isFetching && isFetched && <ConversationHeader />}
        </>
      ) : (
        <DefaultHeader />
      )}
    </nav>
  );
};

export default Header;
