import { getAuthSession } from '@/lib/auth';
import { db, restrictedNames } from '@/lib/db';
import { EditCommunityValidator } from '@/validators/community';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { id, name, description, image } = EditCommunityValidator.parse(body);

    // Check if the community name is in the restrictedNames array
    if (restrictedNames.includes(name.toLowerCase())) {
      return new Response('Community name is restricted', { status: 412 });
    }

    const communityExists = await db.community.findFirst({
      where: {
        name,
      },
    });

    if (communityExists) {
      if (communityExists?.creatorId === session.user.id) {
        try {
          const community = await db.community.update({
            where: {
              id,
            },
            data: {
              name,
              description,
              image,
              updatedAt: new Date(), // Set the update date
            },
          });
          return new Response(community?.name);
        } catch (err) {
          console.error('Error updating community:', err);
          return new Response('Failed to update community', { status: 500 });
        }
      } else {
        return new Response('Community already exists', { status: 409 });
      }
    }

    const updatedCommunity = await db.community.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        image,
        updatedAt: new Date(), // Set the update date
      },
    });
    return new Response(updatedCommunity?.name);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Could not update community ' + error, { status: 500 });
  }
}
