import { ExtendedPost } from '@/types/db';
import UserAvatar from '../user/UserAvatar';
import Link from 'next/link';
import { cn, formatTimeToNow } from '@/lib/utils';
import { ArrowBigUp, MessageSquare, Users2 } from 'lucide-react';
import { ArrowBigDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { buttonVariants } from '../../ui/Button';
import {
  Community,
  Subscription,
  User,
  Notification as NotificationType,
  Comment,
} from '@prisma/client';

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

export type NotificationItemProps = {
  children: React.ReactNode;
  href: string;
  icon: React.ReactNode;
  contentProps: {
    sender?: User | null;
    displayName?: string | null;
    userLink?: string;
    text?: string | null;
    createdAt?: Date | null;
  };
};

const NotificationItem = ({
  children,
  href,
  icon,
  contentProps,
}: NotificationItemProps) => {
  const router = useRouter();

  return (
    <div className='rounded-md bg-white dark:bg-[#000000] shadow dark:border border-[#333333]'>
      <div
        className={cn(
          buttonVariants({
            variant: 'ghost',
          }),
          'w-full h-full justify-start font-normal cursor-pointer'
        )}
        onClick={() => router.push(href)}
      >
        <div className='flex gap-6'>
          {icon}
          <div className='flex flex-col justify-center space-y-3'>
            <div className='flex items-center'>
              <Link
                href={
                  contentProps.userLink || `/u/${contentProps.sender?.username}`
                }
              >
                <UserAvatar
                  user={{
                    name: contentProps.sender?.name || null,
                    image: contentProps.sender?.image || null,
                  }}
                  className='h-6 w-6'
                />
              </Link>
              <div className='ml-2 flex items-center gap-x-2'>
                <a
                  href={
                    contentProps.userLink ||
                    `/u/${contentProps.sender?.username}`
                  }
                >
                  <p className='text-xs'>
                    {contentProps.displayName} {contentProps.text}
                  </p>
                </a>
                {contentProps.createdAt && (
                  <p className='hidden md:flex max-h-40 truncate text-xs text-muted-foreground'>
                    {formatTimeToNow(new Date(contentProps.createdAt))}
                  </p>
                )}
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
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
    <NotificationItem
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
    </NotificationItem>
  ) : (
    <></>
  );
};

export default Notification;
