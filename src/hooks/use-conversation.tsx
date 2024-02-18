'use client';

import { useEffect, useRef, useState } from 'react';
import { pusherClient } from '@/lib/pusher';
import { find } from 'lodash';
import { ExtendedMessage } from '@/types/db';

interface UseConversationProps {
  conversationId: string | undefined;
  initialMessages: ExtendedMessage[] | undefined;
}

const useConversation = ({
  conversationId,
  initialMessages,
}: UseConversationProps) => {
  const [messages, setMessages] = useState<ExtendedMessage[] | undefined>(
    initialMessages
  );
  const bottomRef = useRef<HTMLDivElement | null>(null);

  //   update conversation
  useEffect(() => {
    if (conversationId) {
      pusherClient.subscribe(conversationId);
      bottomRef?.current?.scrollIntoView;

      const messageHandler = (message: ExtendedMessage) => {
        setMessages((current) => {
          if (current && find(current, { id: message.id })) {
            return current;
          }

          return [...(current ?? []), message];
        });

        bottomRef?.current?.scrollIntoView;
      };

      pusherClient.bind('messages:new', messageHandler);

      return () => {
        pusherClient.unsubscribe(conversationId);
        pusherClient.unbind('messages:new', messageHandler);
      };
    }
  }, [conversationId]);

  return {
    messages,
    bottomRef,
  };
};

export default useConversation;
