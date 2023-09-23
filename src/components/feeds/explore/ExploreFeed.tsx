import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { db } from '@/lib/db';
import ExplorePosts from './ExplorePosts';
import { getAuthSession } from '@/lib/auth';
import { Suspense } from 'react';
import Loader from '@/components/ui/Loader';

const ExploreFeed = async () => {
  const session = await getAuthSession();

  // Fetch the communities the user is following
  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      community: true,
    },
  });

  // Get the IDs of communities the user is following
  const followedCommunityIds = followedCommunities.map(
    ({ community }) => community.id
  );

  // Fetch posts from communities that the user is NOT following
  const posts = await db.post.findMany({
    where: {
      NOT: {
        community: {
          name: {
            in: followedCommunityIds,
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      community: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });

  return (
    <Suspense fallback={<Loader />}>
      <ExplorePosts initialPosts={posts} />
    </Suspense>
  );
};

export default ExploreFeed;
