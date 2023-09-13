import { getAuthSession } from "@/lib/auth";
import { db, restrictedNames } from "@/lib/db";
import { CommunityValidator } from "@/lib/validators/community";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, description } = CommunityValidator.parse(body);

    // Check if the community name is in the restrictedNames array
    if (restrictedNames.includes(name.toLowerCase())) {
      return new Response("Community name is restricted", { status: 422 });
    }

    const community = await db.community.findFirst({
        where: {
          name: name
        },

    });

    await db.community.update({
        where: {
          id: community?.id
        },    
        data: {
            name,
            description,
            updatedAt: new Date(), // Set the update date
          },
    })
    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not update community", { status: 500 });
  }
}
