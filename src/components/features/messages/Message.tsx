'use client';

import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { Message as MessageType, User } from '@prisma/client';
import { cn, truncateString } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/Button';
import UserAvatar from '../user/UserAvatar';

interface MessageProps {
  message:
    | (MessageType & {
        recipient: User | null;
        author: User | null;
      })
    | null;
  userId?: string | null;
}

const Message: FC<MessageProps> = ({ message, userId }) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const router = useRouter();
  const recipient = message?.recipient;
  const author = message?.author;
  const text = message?.text;
  const loggedInUserIsAuthor = message?.authorId === userId;

  useEffect(() => {
    if (loggedInUserIsAuthor) {
      setUser(recipient);
    } else {
      setUser(author);
    }
  }, [author, recipient, loggedInUserIsAuthor]);

  const username = user?.username;
  const name = user?.displayName ?? user?.name;

  if (!user || !text) {
    return <></>;
  }

  return (
    <div className='py-1 flex items-center rounded-lg p-1'>
      <div
        className={cn(
          buttonVariants({
            variant: 'ghost',
          }),
          'w-full h-full flex items-center gap-x-4 md:gap-x-5 font-normal cursor-pointer justify-start'
        )}
        onClick={() => router.push(`/messages/u/${username}`)}
      >
        <UserAvatar
          user={{
            name: name || null,
            image: user.image || null,
          }}
          className='h-12 w-12'
        />

        <div className='text-sm'>
          {username && name && (
            <p className='space-x-1'>
              <span className='font-semibold'>{`${truncateString(
                name,
                16
              )}`}</span>

              <span className='text-muted-foreground'>{`u/${truncateString(
                username,
                16
              )} •`}</span>

              <span className='text-muted-foreground'>
                {new Date(message?.createdAt).toLocaleString()}
              </span>
            </p>
          )}

          <div className='pt-1 text-muted-foreground'>
            {loggedInUserIsAuthor && 'You: '}
            {truncateString(text, 35)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
