"use client";

import { ExtendedMessage } from "@/types/db";
import ConversationInput from "./ConversationInput";
import { Conversation as ConversationType } from "@prisma/client";
// import useConversation from "@/hooks/use-conversation";
import { FetchedMessage, SentMessage } from "./ConversationText";
import useCustomBackground from "@/hooks/use-custom-background";
import { startTransition, useEffect, useState } from "react";
import { MessageRequest, ReadConversationPayload } from "@/validators/message";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { useRouter } from "next/navigation";

interface ConversationProps {
  conversation:
    | (ConversationType & {
        messages: ExtendedMessage[];
        lastMessage: ExtendedMessage | null; 
      })
    | null;
  authorId: string | undefined;
}

const Conversation = ({ conversation, authorId }: ConversationProps) => {
  // const { messages, bottomRef } = useConversation({
  //   conversationId: conversation?.id,
  //   initialMessages: conversation?.messages,
  // });
  const { bgProps } = useCustomBackground();
  const fetchedMessages = conversation?.messages;
  const [sentMessages, setSentMessages] = useState<
    MessageRequest[] | undefined
  >([]);
  const router = useRouter();
  const { loginToast } = useCustomToast();
  const recipientIsReadingConversation =
    conversation?.lastMessage.recipientId === authorId;

  const { mutate: readConversation } = useMutation({
    mutationFn: async () => {
      const payload: ReadConversationPayload = {
        conversationId: conversation?.id ?? "",
      };
      await axios.patch("/api/conversation/read", payload);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
    },
  });

  useEffect(() => {
    if (recipientIsReadingConversation) {
      readConversation();
    }
  }, [recipientIsReadingConversation, readConversation]);

  return (
    <main className="flex-1 justify-between flex flex-col h-[calc(100svh-0.8rem)] md:h-[calc(100svh-8rem)] relative">
      <div className="md:hidden h-[3rem] w-full" />
      <div
        id="conversation"
        className="flex h-full flex-1 flex-col-reverse gap-1.5 px-3 py-5 overflow-y-auto md:rounded-lg"
        style={bgProps && bgProps}
      >
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
