import FollowingFeed from '@/components/feeds/FollowingFeed';
import HomeFeedToggle from '@/components/ui/HomeFeedToggle';
import { getAuthSession } from '@/lib/auth';
import SignInFireWall from '@/components/auth/SignInFireWall';
import { db } from '@/lib/db';
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
      {session ? (
        <>
          <HomeFeedToggle />
          <div className={`${session && 'pt-6'}`}>
            <FollowingFeed initialPosts={posts} />
          </div>
        </>
      ) : (
        <SignInFireWall />
      )}
    </div>
  );
}
