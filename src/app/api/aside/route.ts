import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { getUserById } from '@/lib/user';
import { Community, User } from '@prisma/client';
import { z } from 'zod';

export async function GET(req: Request) {
  try {
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

      const res = {
        session,
        subs,
        user,
      };

      return new Response(JSON.stringify(res));
    } else {
      return new Response('Unauthorized', { status: 401 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Could not retrieve', { status: 500 });
  }
}
