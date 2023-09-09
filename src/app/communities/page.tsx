import SignInFireWall from '@/components/auth/SignInFireWall';
import Communities from '@/components/pages/Communities';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { Community } from '@prisma/client';

export const metadata = {
  title: 'Communities / Z',
  description: '',
  openGraph: {
    title: 'Communities / Z',
    description: '',
    images: [
      {
        url: '',
        width: 200,
        height: 200,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Communities / Z',
    description: '',
    images: [''],
  },
};

interface CommunitiesPageProps {}

const CommunitiesPage = async ({}: CommunitiesPageProps) => {
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
