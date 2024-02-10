'use client';

import useCustomBackground from '@/hooks/use-custom-background';
import {
  Conversation as ConversationType,
  Message,
  User,
} from '@prisma/client';
import ConversationText from './ConversationText';

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

  return (
    <>
      <div className='md:hidden h-[3rem] w-full' />
      <div
        id='conversation'
        className='flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto'
        style={bgStyles && bgStyles}
      >
        {messages?.map((message) => (
          <div key={`${message.id}_y_x`}>
            {/* @ts-expect-error async component */}
            <ConversationText fetchedMessage={message} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Conversation;
