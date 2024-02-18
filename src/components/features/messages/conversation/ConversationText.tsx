'use client';
import { redis } from '@/lib/redis';
import { CachedMessage } from '@/types/redis';
import { Message, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ConversationTextProps {
  fetchedMessage: Message & {
    author: User | null;
    recipient: User | null;
  };
}

const ConversationText = ({ fetchedMessage }: ConversationTextProps) => {
  const [message, setMessage] = useState<
    | CachedMessage
    | (Message & {
        author: User | null;
        recipient: User | null;
      })
    | undefined
  >(fetchedMessage);

  useEffect(() => {
    async function getChatMessageFromRedis() {
      async function getChatMessage(messageId: string) {
        try {
          if (messageId) {
            const cachedMessage = (await redis.hgetall(
              `message:${messageId}`
            )) as CachedMessage;
            return cachedMessage;
          }
        } catch (error: any) {
          console.error(error?.message);
        }
      }
      const redisMessage = await getChatMessage(fetchedMessage?.id);

      if (redisMessage) {
        setMessage(redisMessage);
      }
    }

    getChatMessageFromRedis();
  }, [fetchedMessage]);

  const { data: session } = useSession();
  const loggedInUser = session?.user;
  const loggedInUserIsAuthor = message?.authorId === loggedInUser?.id;

  // const text = message?.text?.trim();
  // const isTextEmpty = text === '';

  // const imageUrl = message?.image?.trim();
  // const isImageUrlEmpty = imageUrl === '';

  const text = message?.text;
  const isTextEmpty = text === '';

  const imageUrl = message?.image;
  const isImageUrlEmpty = imageUrl === '';

  return (
    message?.authorId && (
      <div
        className={`flex ${
          loggedInUserIsAuthor ? 'justify-end' : 'justify-start'
        }`}
      >
        <div
          className={`gap-1.5 flex flex-col max-w-[70%] md:max-w-[60%] ${
            loggedInUserIsAuthor ? 'flex-end' : 'flex-start'
          }`}
        >
          {text && !isTextEmpty && (
            <p
              className={`max-w-lg h-fit w-fit py-2 px-4 text-white ${
                loggedInUserIsAuthor
                  ? 'message-gradient rounded-l-3xl rounded-br-3xl rounded-tr-sm'
                  : 'bg-zinc-400 dark:bg-zinc-600 rounded-r-3xl rounded-bl-3xl rounded-tl-sm'
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
              className='rounded-lg'
            />
          )}
        </div>
      </div>
    )
  );
};

export default ConversationText;
