import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { Community, User } from '@prisma/client';
import AsideClient from './AsideClient';
import { getUserById } from '@/lib/user';

const Aside = async () => {
  const session = await getAuthSession();
  const zUser = session?.user;

  let subs: Community[] = [];

  let user: User | null = null;

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

    user = await getUserById(zUser.id);

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

  return <AsideClient session={session} subs={subs} user={user} />;
};

export default Aside;
