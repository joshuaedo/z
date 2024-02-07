import { getAuthSession } from '@/lib/auth';
import { getCommunityByName } from '@/lib/community';
import { db, restrictedNames } from '@/lib/db';
import { CommunityValidator } from '@/validators/community';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { name, description, image } = CommunityValidator.parse(body);

    // Check if the community name is in the restrictedNames array
    if (restrictedNames.includes(name.toLowerCase())) {
      return new Response('Community name is restricted', { status: 412 });
    }

    const communityExists = await getCommunityByName(name);

    if (communityExists) {
      return new Response('Community already exists', { status: 409 });
    }

    const community = await db.community.create({
      data: {
        name,
        image,
        description,
        creatorId: session.user.id,
        createdAt: new Date(), // Set the creation date
        updatedAt: new Date(), // Set the update date
      },
    });

    await db.subscription.create({
      data: {
        userId: session.user.id,
        communityId: community.id,
      },
    });

    return new Response(community.name);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Could not create community', { status: 500 });
  }
}
