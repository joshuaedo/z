import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProfileValidator } from "@/lib/validators/profile";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { profileTheme, username, displayName, bio, link, birthday, image } =
      ProfileValidator.parse(body);

    console.log("Received data:", {
      profileTheme,
      username,
      displayName,
      bio,
      link,
      birthday,
    });

    // check if username is taken
    const usernameExists = await db.user.findFirst({
      where: {
        username: username,
      },
    });

    // check if user is trying to update their own profile

    if (usernameExists) {
      try {
        if (usernameExists.id === session.user.id) {
          // update profile
          const user = await db.user.update({
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
          return new Response(user?.username);
        }
      } catch (err) {
        return new Response(err);
      }
      return new Response("Username is taken", { status: 409 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      error + "Could not update profile at this time. Please try later",
      { status: 500 }
    );
  }
}
