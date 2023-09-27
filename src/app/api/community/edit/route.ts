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
    const { name, description, image } = CommunityValidator.parse(body);

    // Check if the community name is in the restrictedNames array
    if (restrictedNames.includes(name.toLowerCase())) {
      return new Response("Community name is restricted", { status: 412 });
    }

    const existingCommunity = await db.community.findFirst({
      where: {
        name: name,
      },
    });

    // Check if a community with the new name already exists
    if (existingCommunity && existingCommunity.id !== communityId) {
      return new Response("Community name already exists", { status: 409 });
    }

    // Fetch the current community based on some identifier like communityId
    const communityId = req.params.communityId;
    const community = await db.community.findUnique({
      where: {
        id: communityId,
      },
    });

    // Check if the community exists
    if (!community) {
      return new Response("Community not found", { status: 404 });
    }

    // Update the community
    const updatedCommunity = await db.community.update({
      where: {
        id: communityId,
      },
      data: {
        name,
        description,
        image,
        updatedAt: new Date(), // Set the update date
      },
    });

    return new Response(updatedCommunity.name);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not update community " + error, { status: 500 });
  }
}
