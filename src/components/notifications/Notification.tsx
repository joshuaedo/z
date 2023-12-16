import {
  Comment,
  Community,
  Notification as NotificationType,
  Subscription,
  User,
} from '@prisma/client';
import { ExtendedPost } from '@/types/db';
import UserAvatar from '../ui/UserAvatar';
import Link from 'next/link';
import { formatTimeToNow } from '@/lib/utils';
import { ArrowBigUp, MessageSquare, Users2 } from 'lucide-react';
import { ArrowBigDown } from 'lucide-react';

export type ExtendedNotification = NotificationType & {
  sender: User | null;
  post: ExtendedPost | null;
  subscribe: ExtendedSubscription | null;
  comment: Comment | null;
};

export type ExtendedSubscription = Subscription & {
  community: Community | null;
};

export type NotificationProps = {
  notification: ExtendedNotification | undefined;
};

const Notification = ({ notification }: NotificationProps) => {
  const sender = notification?.sender;
  const post = notification?.post;
  const subscription = notification?.subscribe;
  const comment = notification?.comment;
  const vote = notification?.voteType;
  const displayName = sender?.displayName ?? sender?.name ?? sender?.username;

  if (notification?.type === 'comment') {
    return (
      <Link href={`/z/${post?.community?.name}/post/${post?.id}`}>
        <div className='flex gap-6'>
          <MessageSquare className='h-8 w-8' />
          {post && sender && comment && (
            <div className='flex flex-col space-y-3'>
              <div className='flex items-center'>
                <Link href={`/u/${sender?.username}`}>
                  <UserAvatar
                    user={{
                      name: sender?.name || null,
                      image: sender?.image || null,
                    }}
                    className='h-6 w-6'
                  />
                </Link>
                <div className='ml-2 flex items-center gap-x-2'>
                  <a href={`/u/${sender?.username}`}>
                    <p className='text-xs font-medium'>{displayName}</p>
                  </a>
                  <p className='max-h-40 truncate text-xs text-muted-foreground'>
                    {formatTimeToNow(new Date(comment?.createdAt))}
                  </p>
                </div>
              </div>
              <p className='text-sm'>{comment?.text}</p>
            </div>
          )}
        </div>
      </Link>
    );
  }

  if (notification?.type === 'comment_vote' || notification?.type === 'vote') {
    let voted = 'reacted to';
    let isUpVote;

    if (vote === 'UP') {
      voted = 'upvoted';
      isUpVote = true;
    }
    if (vote === 'DOWN') {
      voted = 'downvoted';
      isUpVote = false;
    }

    return (
      <Link href={`/z/${post?.community?.name}/post/${post?.id}`}>
        <div className='flex gap-6'>
          {isUpVote ? (
            <ArrowBigUp className='h-8 w-8 text-purple-500 fill-purple-500' />
          ) : (
            <ArrowBigDown className='h-8 w-8 text-red-500 fill-red-500' />
          )}

          <div className='flex items-center'>
            <Link href={`/u/${sender?.username}`}>
              <UserAvatar
                user={{
                  name: sender?.name || null,
                  image: sender?.image || null,
                }}
                className='h-6 w-6'
              />
            </Link>
            <div className='ml-2 flex items-center gap-x-2'>
              <p className='text-xs'>
                <a href={`/u/${sender?.username}`}>{displayName}</a> {voted}{' '}
                your post
              </p>
              <p className='hidden md:flex max-h-40 truncate text-xs text-muted-foreground'>
                {formatTimeToNow(new Date(notification?.createdAt))}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (notification?.type === 'subscribe') {
    return (
      <Link href={`/z/${subscription?.community?.id}`}>
        <div className='flex gap-6'>
          <Users2 className='h-8 w-8' />

          <div className='flex items-center'>
            <Link href={`/u/${sender?.username}`}>
              <UserAvatar
                user={{
                  name: sender?.name || null,
                  image: sender?.image || null,
                }}
                className='h-6 w-6'
              />
            </Link>
            <div className='ml-2 flex items-center gap-x-2'>
              <p className='text-xs'>
                <a href={`/u/${sender?.username}`}>{displayName}</a> subscribed
                to {subscription?.community?.name}
              </p>
              <p className='hidden md:flex max-h-40 truncate text-xs text-muted-foreground'>
                {formatTimeToNow(new Date(notification?.createdAt))}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return <></>;
};

export default Notification;
