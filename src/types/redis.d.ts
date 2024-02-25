import { VoteType } from '@prisma/client';

export type CachedPost = {
  id: string;
  title: string;
  authorUsername: string;
  content: string;
  currentVote: VoteType | null;
  createdAt: Date;
};

export type CachedMessage = {
  authorId: string;
  text: string | undefined;
  image: string | undefined;
  recipientId: string;
  read: boolean;
  createdAt: Date;
};
