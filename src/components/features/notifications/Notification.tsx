import { ArrowBigUp, MessageSquare, Users2 } from 'lucide-react';
import { ArrowBigDown } from 'lucide-react';
import { ExtendedNotification } from '@/types/db';
import NotificationClient from './NotificationClient';

export type NotificationProps = {
  notification: ExtendedNotification | undefined;
};

const Notification = ({ notification }: NotificationProps) => {
  const sender = notification?.sender;
  const post = notification?.post;
  const subscription = notification?.subscribe;
  const comment = notification?.comment;
  const vote = notification?.voteType;
  const type = notification?.type;
  const date = notification?.createdAt;

  const displayName = sender?.displayName ?? sender?.name ?? sender?.username;

  const isPostAvailable =
    (type === 'comment' || type === 'vote' || type === 'comment_vote') && post;

  const isSubscriptionAvailable = type === 'subscribe' && subscription;

  const filterNotification = isPostAvailable || isSubscriptionAvailable;

  const contentProps = {
    sender,
    displayName,
    userLink: `/u/${sender?.username}`,
    text:
      type === 'comment'
        ? 'commented on your post'
        : type === 'comment_vote' || type === 'vote'
        ? vote === 'UP'
          ? 'upvoted your post'
          : 'downvoted your post'
        : `subscribed to ${subscription?.community?.name}`,
    createdAt: date,
  };

  return filterNotification ? (
    <NotificationClient
      href={
        type === 'comment'
          ? `/z/${post?.community?.name}/post/${post?.id}`
          : type === 'comment_vote' || type === 'vote'
          ? `/z/${post?.community?.name}/post/${post?.id}`
          : `/z/${subscription?.community?.name}`
      }
      icon={
        type === 'comment' ? (
          <MessageSquare className='h-8 w-8' />
        ) : type === 'comment_vote' || type === 'vote' ? (
          vote === 'UP' ? (
            <ArrowBigUp className='h-8 w-8 text-purple-500 fill-purple-500' />
          ) : (
            <ArrowBigDown className='h-8 w-8 text-red-500 fill-red-500' />
          )
        ) : (
          <Users2 className='h-8 w-8' />
        )
      }
      contentProps={contentProps}
    >
      {type === 'comment' && (
        <p className='text-sm'>&quot;{comment?.text}&quot;</p>
      )}
    </NotificationClient>
  ) : (
    <></>
  );
};

export default Notification;
