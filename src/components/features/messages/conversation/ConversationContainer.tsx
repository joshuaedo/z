'use client';

import useCustomBackground from '@/hooks/use-custom-background';
import ConversationText from './ConversationText';
import { ExtendedMessage } from '@/types/db';
import { MutableRefObject } from 'react';

interface ConversationContainerProps {
  messages: ExtendedMessage[] | undefined;
  bottomRef?: MutableRefObject<HTMLDivElement | null>;
}

const ConversationContainer = ({
  messages,
  bottomRef,
}: ConversationContainerProps) => {
  const bgStyles = useCustomBackground();
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

export default ConversationContainer;
