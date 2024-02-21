"use client";

import { ExtendedMessage } from "@/types/db";
import ConversationInput from "./ConversationInput";
import { Conversation as ConversationType } from "@prisma/client";
// import useConversation from "@/hooks/use-conversation";
import { FetchedMessage, SentMessage } from "./ConversationText";
import useCustomBackground from "@/hooks/use-custom-background";
import { useState } from "react";
import { MessageRequest } from "@/validators/message";

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
  const bgStyles = useCustomBackground();
  const fetchedMessages = conversation?.messages;
  const [sentMessages, setSentMessages] = useState<
    MessageRequest[] | undefined
  >([]);

  return (
    <main className="flex-1 justify-between flex flex-col h-[calc(100svh-0.8rem)] md:h-[calc(100svh-8rem)] relative">
      <div className="md:hidden h-[3rem] w-full" />
      <div
        id="conversation"
        className="flex h-full flex-1 flex-col-reverse gap-1.5 px-3 py-5 overflow-y-auto md:rounded-lg"
        style={bgStyles && bgStyles}
      >
        {/* Conversation Background */}
        {sentMessages
          ?.slice()
          .reverse()
          .map((message) => (
            // @ts-ignore
            <SentMessage key={`${authorId}_s_m`} sentMessage={message} />
          ))}

        {fetchedMessages?.map((message) => (
          // @ts-ignore
          <FetchedMessage key={`${message.id}_f_m`} fetchedMessage={message} />
        ))}
      </div>
      <ConversationInput
        authorId={authorId}
        setSentMessages={setSentMessages}
      />
    </main>
  );
};

export default Conversation;
