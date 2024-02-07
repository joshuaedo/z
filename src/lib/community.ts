import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { db } from '@/lib/db';
import { ExtendedPost } from '@/types/db';
import { Community } from '@prisma/client';

type getCommunityOptions = {
  name?: string;
  id?: string;
  includePosts?: 'posts';
};

export type CommunityWithPosts = Community & {
  posts: ExtendedPost[];
};

const getCommunity = async ({
  name,
  id,
  includePosts,
}: getCommunityOptions) => {
  const whereCondition = name ? { name } : id ? { id } : {};

  let includeClause = {};

  if (includePosts === 'posts') {
    includeClause = {
      include: {
        posts: {
          include: {
            author: true,
            votes: true,
            comments: true,
            community: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: INFINITE_SCROLLING_PAGINATION_RESULTS,
        },
      },
    };
  }

  let community: Community | null;

  if (id) {
    community = await db.community.findUnique({
      where: whereCondition,
      ...includeClause,
    });
  } else {
    community = await db.community.findFirst({
      where: whereCondition,
      ...includeClause,
    });
  }

  if (community && includePosts === 'posts') {
    return community as CommunityWithPosts;
  }

  return community as Community;
};

const getCommunityByName = async (name: string, includePosts?: 'posts') => {
  return await getCommunity({ name, includePosts });
};

const getCommunityById = async (id: string, includePosts?: 'posts') => {
  return await getCommunity({ id, includePosts });
};

export { getCommunityByName, getCommunityById, getCommunity };
