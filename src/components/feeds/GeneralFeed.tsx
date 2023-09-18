import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { db } from '@/lib/db';
import PostFeed from './PostFeed';
import { Suspense } from 'react';
import Loader from '@/components/Loader';

const GeneralFeed = async () => {
  const posts = await db.post.findMany({
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
      <PostFeed initialPosts={posts} />
    </Suspense>
  );
};

export default GeneralFeed;
