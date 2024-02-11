'use client';
import { redis } from '@/lib/redis';
import { CachedMessage } from '@/types/redis';
import { Message, User } from '@prisma/client';
import { useSession } from 'next-auth/react';
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
  const loggedInUser = session?.user
  const isAuthor = message?.authorId === loggedInUser?.id

  const text = message?.text;
  return <div>{text}</div>;
};

export default ConversationText;
