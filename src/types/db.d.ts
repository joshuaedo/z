import {
  Comment,
  Community,
  Message,
  Notification,
  Post,
  User,
  Vote,
} from "@prisma/client";

export type ExtendedPost = Post & {
  community: Community;
  votes: Vote[];
  author: User;
  comments: Comment[];
};

export type ExtendedMessage = Message & {
  author: User | null;
  recipient: User | null;
};

export type ExtendedSubscription = Subscription & {
  community: Community | null;
};

export type ExtendedNotification = Notification & {
  sender: User | null;
  post: ExtendedPost | null;
  subscribe: ExtendedSubscription | null;
  comment: Comment | null;
};

export type NotificationClientProps = {
  id: string;
  children: React.ReactNode;
  href: string;
  icon: React.ReactNode;
  sender?: User | null;
  text?: string | null;
  createdAt?: Date | null;
  isRead?: boolean | null;
};

export type UnreadNotifications = {
  isNewHomeFeed: boolean;
  isNewExploreFeed: boolean;
  isJoinedNewCommunity: boolean;
  unreadNotificationsCount: number;
  unreadMessagesCount: number;
};
