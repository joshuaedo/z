'use client';

import useCustomBackground from '@/hooks/use-custom-background';
import {
  Conversation as ConversationType,
  Message,
  User,
} from '@prisma/client';
import ConversationText from './ConversationText';
import { useRef } from 'react';

interface ConversationProps {
  conversation:
    | (ConversationType & {
        messages: (Message & {
          author: User | null;
          recipient: User | null;
        })[];
      })
    | null;
}

const Conversation = ({ conversation }: ConversationProps) => {
  const bgStyles = useCustomBackground();
  const messages = conversation?.messages;
  const bottomRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div className='md:hidden h-[3rem] w-full' />
      <div
        id='conversation'
        className='flex h-full flex-1 flex-col-reverse gap-1.5 px-3 py-5 overflow-y-auto md:rounded-lg'
        style={bgStyles && bgStyles}
      >
        {messages?.map((message) => (
          // @ts-expect-error async component
          <ConversationText
            key={`${message.id}_y_x`}
            fetchedMessage={message}
          />
        ))}
      </div>
      <div ref={bottomRef} />
    </>
  );
};

export default Conversation;
