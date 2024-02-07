import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { getUserByUsername } from '@/lib/user';
import { ProfileValidator } from '@/validators/profile';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    const { profileTheme, username, displayName, bio, link, birthday, image } =
      ProfileValidator.parse(body);

    // Check if username is taken
    const usernameExists = await getUserByUsername(username);

    // Check if user is trying to update their own profile
    if (usernameExists) {
      if (usernameExists.id === session.user.id) {
        try {
          // Update profile
          const user = await db.user.update({
            where: {
              id: session.user.id,
            },
            data: {
              image: image,
              profileTheme: profileTheme,
              displayName: displayName,
              bio: bio,
              link: link,
              birthday: birthday,
            },
          });
          return new Response(user?.username);
        } catch (err) {
          // console.error("Error updating profile:", err);
          return new Response('Failed to update profile', { status: 500 });
        }
      } else {
        return new Response('Username is taken', { status: 409 });
      }
    }

    // If username is not taken, update profile without username conflict
    const updatedUser = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: image,
        profileTheme: profileTheme,
        username: username,
        displayName: displayName,
        bio: bio,
        link: link,
        birthday: birthday,
      },
    });
    return new Response(updatedUser?.username);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    // console.error("Unhandled error:", error);
    return new Response(
      'Could not update profile at this time. Please try later',
      { status: 500 }
    );
  }
}
