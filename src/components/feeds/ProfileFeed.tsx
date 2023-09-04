import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { db } from '@/lib/db';
import PostFeed from './PostFeed';
import { getAuthSession } from '@/lib/auth';

const ProfileFeed = async () => {
  const session = await getAuthSession();

  const posts = await db.post.findMany({
    where: {
      authorId: session?.user.id,
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

  return <PostFeed initialPosts={posts} />;
};

export default ProfileFeed;
