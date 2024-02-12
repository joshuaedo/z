'use client';
import { redis } from '@/lib/redis';
import { CachedMessage } from '@/types/redis';
import { Message, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

interface ConversationTextProps {
  fetchedMessage: Message & {
    author: User | null;
    recipient: User | null;
  };
}

const ConversationText = async ({ fetchedMessage }: ConversationTextProps) => {
  const [message, setMessage] = useState<
    | CachedMessage
    | (Message & {
        author: User | null;
        recipient: User | null;
      })
  >(fetchedMessage);

  // if (fetchedMessage?.id) {
  //   const cachedMessage = (await redis.hgetall(
  //     `message:${fetchedMessage?.id}`
  //   )) as CachedMessage;
  //   setMessage(cachedMessage);
  // }

  const { data: session } = useSession();
  const loggedInUser = session?.user;
  const loggedInUserIsAuthor = message?.authorId === loggedInUser?.id;

  const text = message?.text?.trim();
  const isTextEmpty = text === '';

  const imageUrl = message?.image?.trim();
  const isImageUrlEmpty = imageUrl === '';

  return (
    <div
      className={`flex py-1 ${
        loggedInUserIsAuthor ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex flex-col ${
          loggedInUserIsAuthor ? 'flex-end' : 'flex-start'
        }`}
      >
        {text && !isTextEmpty && (
          <p
            className={`max-w-lg h-fit w-fit px-[0.5rem] py-[0.5rem] text-white ${
              loggedInUserIsAuthor
                ? 'message-gradient rounded-tl-full rounded-tr-md rounded-br-full rounded-bl-full'
                : 'bg-zinc-600 rounded-tl-full rounded-tr-full rounded-br-full rounded-bl-md'
            }`}
          >
            {text}
          </p>
        )}
        {imageUrl && !isImageUrlEmpty && (
          <Image
            src={imageUrl}
            height={200}
            width={200}
            alt={`Image from ${message?.authorId}`}
          />
        )}
      </div>
    </div>
  );
};

export default ConversationText;
