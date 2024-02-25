"use client";
import { ZoomableImage } from "@/components/ui/Image";
import Modal from "@/components/ui/Modal";
import { redis } from "@/lib/redis";
import { CachedMessage } from "@/types/redis";
import { MessageRequest } from "@/validators/message";
import { Message, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FetchedMessageProps {
  fetchedMessage: Message & {
    author: User | null;
    recipient: User | null;
  };
}

interface SentMessageProps {
  sentMessage: MessageRequest;
}

interface MessageDisplayProps {
  message:
    | CachedMessage
    | (Message & { author: User | null; recipient: User | null })
    | MessageRequest
    | undefined;
  isAuthor: boolean;
  isSending?: boolean;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({
  message,
  isAuthor,
  isSending = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  const text = message?.text?.trim();
  const isTextEmpty = text === "";

  const imageUrl = message?.image?.trim();
  const isImageUrlEmpty = imageUrl === "";

  return (
    <div className={`flex ${isAuthor ? "justify-end" : "justify-start"}`}>
      <div
        className={`gap-1.5 flex flex-col max-w-[70%] md:max-w-[60%] ${
          isAuthor ? "flex-end" : "flex-start"
        }`}
      >
        {text && !isTextEmpty && (
          <div className={`flex ${isAuthor ? "justify-end" : "justify-start"}`}>
            <p
              className={`max-w-lg h-fit w-fit py-2 px-4 text-white ${isSending ? "opacity-70 animate-pulse" : ""} ${
                isAuthor
                  ? "message-gradient rounded-l-3xl rounded-br-3xl rounded-tr-sm"
                  : "bg-zinc-400 dark:bg-zinc-600 rounded-r-3xl rounded-bl-3xl rounded-tl-sm"
              }`}
            >
              {text}
            </p>
          </div>
        )}
        {imageUrl && !isImageUrlEmpty && (
          <Image
            onClick={toggleModal}
            src={imageUrl}
            height={200}
            width={200}
            alt={`Image from ${message?.authorId}`}
            className={`rounded-lg cursor-pointer ${isSending ? "opacity-70 animate-pulse" : ""}`}
          />
        )}
      </div>

      {isModalOpen && imageUrl && !isImageUrlEmpty && (
        <Modal
          modalContainer="max-w-full"
          showMax={false}
          toggleModal={toggleModal}
          isModalInterceptor={false}
        >
          <div className="pt-8 w-full h-full">
            <ZoomableImage
              src={imageUrl}
              height={1000}
              width={1000}
              alt={`Fullscreen Image from ${message?.authorId}`}
              className="rounded-lg w-full h-full object-contain"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

const FetchedMessage = ({ fetchedMessage }: FetchedMessageProps) => {
  const [message, setMessage] = useState<
    | CachedMessage
    | (Message & { author: User | null; recipient: User | null })
    | undefined
  >(fetchedMessage);
  useEffect(() => {
    async function getChatMessageFromRedis() {
      async function getChatMessage(messageId: string) {
        try {
          if (messageId) {
            const cachedMessage = (await redis.hgetall(
              `message:${messageId}`,
            )) as CachedMessage;
            return cachedMessage;
          }
        } catch (error: any) {
          /* eslint-disable no-console */
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

  return message?.authorId ? (
    <MessageDisplay message={message} isAuthor={loggedInUserIsAuthor} />
  ) : (
    <></>
  );
};

const SentMessage = ({ sentMessage: message }: SentMessageProps) => {
  return message?.authorId ? (
    <MessageDisplay message={message} isAuthor={true} isSending={true} />
  ) : (
    <></>
  );
};

export { FetchedMessage, SentMessage };
