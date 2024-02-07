import { Comment, Community, Post, User, Vote } from '@prisma/client';

export type ExtendedPost = Post & {
  community: Community;
  votes: Vote[];
  author: User;
  comments: Comment[];
};

export type ExtendedSubscription = Subscription & {
  community: Community | null;
};

export type ExtendedNotification = NotificationType & {
  sender: User | null;
  post: ExtendedPost | null;
  subscribe: ExtendedSubscription | null;
  comment: Comment | null;
};

export type NotificationClientProps = {
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
