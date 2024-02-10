import Link from 'next/link';
import UserAvatar from '../../user/UserAvatar';
import { truncateString } from '@/lib/utils';
import { User } from '@prisma/client';

interface ConversationHeaderProps {
  user: User | null;
}

const ConversationHeader = ({ user }: ConversationHeaderProps) => {
  const username = user?.username;
  const name = user?.displayName ?? user?.name;

  if (!user || !username || !name) {
    return null;
  }

  return (
    <nav className='absolute inset-0 w-full'>
      <div className='md:hidden h-[3rem] w-full' />
      <div className='w-full flex justify-center items-center text-center'>
        <div className='p-6'>
          <Link href={`/u/${username}`} className='space-y-1'>
            <UserAvatar
              user={{
                name: name || null,
                image: user?.image || null,
              }}
              className='h-20 w-20'
            />

            <p className='font-semibold text-base md:text-lg'>{`${truncateString(
              name,
              35
            )}`}</p>

            <p className='text-muted-foreground text-sm md:text-base'>{`u/${truncateString(
              username,
              35
            )}`}</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default ConversationHeader;
