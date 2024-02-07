"use client";

import UserAvatar from '../user/UserAvatar';
import { buttonVariants } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn, formatTimeToNow } from '@/lib/utils';
import { NotificationClientProps } from '@/types/db';

const NotificationClient = ({
  children,
  href,
  icon,
  contentProps,
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
              <Link
                href={
                  contentProps.userLink || `/u/${contentProps.sender?.username}`
                }
              >
                <UserAvatar
                  user={{
                    name: contentProps.sender?.name || null,
                    image: contentProps.sender?.image || null,
                  }}
                  className='h-6 w-6'
                />
              </Link>
              <div className='ml-2 flex items-center gap-x-2'>
                <a
                  href={
                    contentProps.userLink ||
                    `/u/${contentProps.sender?.username}`
                  }
                >
                  <p className='text-xs'>
                    {contentProps.displayName} {contentProps.text}
                  </p>
                </a>
                {contentProps.createdAt && (
                  <p className='hidden md:flex max-h-40 truncate text-xs text-muted-foreground'>
                    {formatTimeToNow(new Date(contentProps.createdAt))}
                  </p>
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
