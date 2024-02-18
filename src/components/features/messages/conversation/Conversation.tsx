'use client';

import { ExtendedMessage } from '@/types/db';
import ConversationContainer from './ConversationContainer';
import ConversationInput from './ConversationInput';
import { Conversation as ConversationType } from '@prisma/client';
import useConversation from '@/hooks/use-conversation';

interface ConversationProps {
  conversation:
    | (ConversationType & {
        messages: ExtendedMessage[];
      })
    | null;
  authorId: string | undefined;
}

const Conversation = ({ conversation, authorId }: ConversationProps) => {
  // const { messages, bottomRef } = useConversation({
  //   conversationId: conversation?.id,
  //   initialMessages: conversation?.messages,
  // });

  return (
    <main className='flex-1 justify-between flex flex-col h-[calc(100svh-0.8rem)] md:h-[calc(100svh-8rem)] relative'>
      <ConversationContainer messages={conversation?.messages} />
      <ConversationInput authorId={authorId} />
    </main>
  );
};

export default Conversation;
