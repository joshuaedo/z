export type SearchResults = {
  communities: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    description: string | null;
    image: string | null;
    creatorId: string;
    _count: {
      posts: number;
      subscribers: number;
    };
  }[];
  users: {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    image: string;
    username: string;
    bio: string | null;
    link: string | null;
    displayName: string | null;
    birthday: string | null;
    profileTheme: string | null;
    _count: {
      createdCommmunity: number;
      accounts: number;
      sessions: number;
      Post: number;
      Comment: number;
      CommentVote: number;
      Vote: number;
      Subscription: number;
    };
  }[];
};
