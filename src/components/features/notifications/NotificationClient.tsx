'use client';

import UserAvatar from '../user/UserAvatar';
import { buttonVariants } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn, formatTimeToNow } from '@/lib/utils';
import { NotificationClientProps } from '@/types/db';

const NotificationClient = ({
  icon,
  href,
  isRead,
  sender,
  createdAt,
  children,
  text,
}: NotificationClientProps) => {
  const router = useRouter();

  return (
    <div className='rounded-md bg-white dark:bg-[#000000] shadow dark:border border-[#333333]'>
      <div
        className={cn(
          buttonVariants({
            variant: 'ghost',
          }),
          'w-full h-full justify-start font-normal cursor-pointer'
        )}
        onClick={() => router.push(href)}
      >
        <div className='flex gap-6'>
          {icon}
          <div className='flex flex-col justify-center space-y-3'>
            <div className='flex items-center'>
              <Link href={`/u/${sender?.username}`}>
                <UserAvatar
                  user={{
                    name: sender?.name || null,
                    image: sender?.image || null,
                  }}
                  className='h-6 w-6'
                />
              </Link>
              <div className='ml-2 flex items-center gap-x-2'>
                <a href={`/u/${sender?.username}`}>
                  <p className='text-xs'>
                    {sender?.displayName ?? sender?.name} {text}
                  </p>
                </a>
                {createdAt && (
                  <p className='hidden md:flex max-h-40 truncate text-xs text-muted-foreground'>
                    {formatTimeToNow(new Date(createdAt))}
                  </p>
                )}
                {!isRead && (
                  <span className='bg-purple-500 w-2 h-2 rounded-full' />
                )}
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationClient;
