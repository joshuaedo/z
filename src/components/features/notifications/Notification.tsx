import { ArrowBigUp, MessageSquare, Users2 } from "lucide-react";
import { ArrowBigDown } from "lucide-react";
import { ExtendedNotification } from "@/types/db";
import NotificationClient from "./NotificationClient";

export type NotificationProps = {
  notification: ExtendedNotification | undefined;
};

const Notification = ({ notification }: NotificationProps) => {
  if (!notification) {
    return <></>;
  }

  const {
    sender,
    type,
    post,
    subscribe: subscription,
    comment,
    voteType: vote,
    createdAt: date,
    read,
  } = notification;

  const isRead = read === true;

  const isNotificationAvailable = subscription || post || comment || vote;

  const text =
    type === "comment"
      ? "commented on your post"
      : type === "comment_vote" || type === "vote"
        ? vote === "UP"
          ? "upvoted your post"
          : "downvoted your post"
        : `subscribed to ${subscription?.community?.name}`;

  const href =
    type === "comment"
      ? `/z/${post?.community?.name}/post/${post?.id}`
      : type === "comment_vote" || type === "vote"
        ? `/z/${post?.community?.name}/post/${post?.id}`
        : `/z/${subscription?.community?.name}`;

  const icon =
    type === "comment" ? (
      <MessageSquare className="h-8 w-8" />
    ) : type === "comment_vote" || type === "vote" ? (
      vote === "UP" ? (
        <ArrowBigUp className="h-8 w-8 text-purple-500 fill-purple-500" />
      ) : (
        <ArrowBigDown className="h-8 w-8 text-red-500 fill-red-500" />
      )
    ) : (
      <Users2 className="h-8 w-8" />
    );

  const commentText = type === "comment" && (
    <p className="text-sm">&quot;{comment?.text}&quot;</p>
  );

  return isNotificationAvailable ? (
    <NotificationClient
      href={href}
      icon={icon}
      isRead={isRead}
      sender={sender}
      createdAt={date}
      text={text}
    >
      {commentText}
    </NotificationClient>
  ) : (
    <></>
  );
};

export default Notification;
