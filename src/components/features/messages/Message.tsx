"use client";

import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Message as MessageType, User } from "@prisma/client";
import { cn, formatMessageTimestamp, truncateString } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import UserAvatar from "../user/UserAvatar";

interface MessageProps {
  message:
    | (MessageType & {
        recipient: User | null;
        author: User | null;
      })
    | null;
  userId?: string | null;
}

const Message: FC<MessageProps> = ({ message, userId }) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const router = useRouter();
  const recipient = message?.recipient;
  const author = message?.author;
  const text = message?.text;
  const loggedInUserIsAuthor = message?.authorId === userId;
  const isRead = message?.read === true;

  useEffect(() => {
    if (loggedInUserIsAuthor) {
      setUser(recipient);
    } else {
      setUser(author);
    }
  }, [author, recipient, loggedInUserIsAuthor]);

  const username = user?.username;
  const name = user?.displayName ?? user?.name;
  const timestamp = message?.createdAt;
  const hasImage = message?.image && message?.image?.length > 3;
  const time = timestamp && formatMessageTimestamp(timestamp);

  if (!user) {
    return <></>;
  }

  if (!text && !hasImage) {
    return <></>;
  }

  return (
    <div className="py-1 flex items-center rounded-lg p-1">
      <div
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          "px-3 w-full h-full flex items-center gap-x-4 md:gap-x-5 font-normal cursor-pointer justify-start",
        )}
        onClick={() => router.push(`/messages/u/${username}`)}
      >
        <UserAvatar
          user={{
            name: name || null,
            image: user.image || null,
          }}
          className="h-12 w-12"
        />

        <div className="text-xs md:text-sm w-full">
          {username && name && (
            <p className="flex w-full overflow-x-hidden">
              <span className="font-semibold truncate-w-bg max-w-[33.3%]">{`${name}`}</span>

              <span className="text-muted-foreground truncate-w-bg max-w-[33.3%] pl-1">{`u/${username}`}</span>

              <span className="text-muted-foreground truncate-w-bg max-w-[33.3%] pl-1">
                • {time}
              </span>
            </p>
          )}

          <div
            className={`pt-1 flex items-center justify-between text-muted-foreground ${
              !loggedInUserIsAuthor &&
              !isRead &&
              "text-black dark:text-white font-semibold"
            }`}
          >
            <span>
              {loggedInUserIsAuthor
                ? text
                  ? `You: ${truncateString(text, 35)}`
                  : "You sent an image"
                : text
                  ? truncateString(text, 35)
                  : "Sent an image"}
            </span>

            {!loggedInUserIsAuthor && !isRead && (
              <span className="bg-purple-500 w-2 h-2 rounded-full" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
