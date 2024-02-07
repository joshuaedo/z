'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Message } from '@prisma/client';
import { Session } from 'next-auth';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/Button';
import UserAvatar from '../user/UserAvatar';

interface MessagesProps {
  session: Session | null;
  messages: Message[];
}

const Messages: FC<MessagesProps> = ({ session, messages }) => {
  const router = useRouter();

  return (
    <main className=''>
      <div className='rounded-lg bg-white dark:bg-[#000000] shadow dark:border border-[#333333] px-8 pb-8 pt-4 space-y-2 '>
        <ul id='message' className=' space-y-3'>
          {messages.map((message) => (
            <div key={message.id}>
              <li className='py-1 flex items-center rounded-lg p-1'>
                <div
                  className={cn(
                    buttonVariants({
                      variant: 'ghost',
                    }),
                    'w-full h-full flex items-center gap-x-4 md:gap-x-5 font-normal cursor-pointer'
                  )}
                  onClick={() => router.push(`/messages/u/${author.username}`)}
                >
                  <UserAvatar
                    user={{
                      name: author?.name || null,
                      image: author?.image || null,
                    }}
                    className='h-12 w-12'
                  />
                  <div>
                    <p className='hidden md:block font-medium'>
                      {`u/${
                        author.name.length > 16
                          ? author.name.slice(0, 15) + '...'
                          : author.name
                      }`}
                    </p>
                    <p className='md:hidden font-medium'>
                      {`u/${
                        author.name.length > 11
                          ? author.name.slice(0, 10) + '...'
                          : author.name
                      }`}
                    </p>

                    <div className='flex items-center pt-2'>
                      <span className='text-xs text-muted-foreground'>
                        {/* last message */}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
      {messages.length < 3 && (
        <li className='w-full text-xs py-3 flex items-center justify-center'>
          <span>- your messages show up here -</span>
        </li>
      )}
    </main>
  );
};

export default Messages;
