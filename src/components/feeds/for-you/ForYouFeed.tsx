import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { db } from '@/lib/db';
import { Suspense } from 'react';
import Loader from '@/components/ui/Loader';
import ForYouPosts from './ForYouPosts';

const ForYouFeed = async () => {
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
      <ForYouPosts initialPosts={posts} />
    </Suspense>
  );
};

export default ForYouFeed;
