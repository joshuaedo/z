import Communities from '@/components/communities/Communities';
import SignInFireWall from '@/components/features/auth/SignInFireWall';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { Community } from '@prisma/client';

export const metadata = {
  title: 'Communities / Z',
  description:
    'Explore and engage with your favorite communities on Z. Join the conversation, share ideas, and connect with like-minded individuals.',
  openGraph: {
    title: 'Communities / Z',
    description:
      'Explore and engage with your favorite communities on Z. Join the conversation, share ideas, and connect with like-minded individuals.',
  },
  twitter: {
    card: 'summary',
    title: 'Communities / Z',
    description:
      'Explore and engage with your favorite communities on Z. Join the conversation, share ideas, and connect with like-minded individuals.',
  },
};

const CommunitiesPage = async () => {
  const session = await getAuthSession();
  const zUser = session?.user;

  let subs: Community[] = [];

  if (zUser) {
    // Fetch user's subscriptions using Prisma
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: zUser.id,
      },
      include: {
        community: true,
      },
    });

    // Extract community names from the subscriptions
    const communityNames = followedCommunities.map(
      ({ community }) => community.name
    );

    // Fetch community data based on names
    subs = await db.community.findMany({
      where: {
        name: {
          in: communityNames,
        },
      },
      include: {
        _count: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  return session ? (
    <Communities subs={subs} session={session} />
  ) : (
    <SignInFireWall />
  );
};

export default CommunitiesPage;
