import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import FollowingFeed from '@/components/feeds/following/FollowingFeed';
import SignInFireWall from '@/components/features/auth/SignInFireWall';

export const metadata = {
  title: 'Home on Z',
  description:
    'Your personalized home feed on Z. Stay updated with the latest posts from the communities you follow.',
  openGraph: {
    title: 'Home on Z',
    description:
      'Your personalized home feed on Z. Stay updated with the latest posts from the communities you follow.',
  },
  twitter: {
    card: 'summary',
    title: 'Home on Z',
    description:
      'Your personalized home feed on Z. Stay updated with the latest posts from the communities you follow.',
  },
};

export default async function HomePage() {
  const session = await getAuthSession();

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      community: true,
    },
  });

  const posts = await db.post.findMany({
    where: {
      community: {
        name: {
          in: followedCommunities.map(({ community }) => community.id),
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
    take: 15,
  });

  return (
    <div className={`relative`}>
      {session ? <FollowingFeed initialPosts={posts} /> : <SignInFireWall />}
    </div>
  );
}
