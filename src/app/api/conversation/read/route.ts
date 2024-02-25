import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ReadConversationValidator } from "@/validators/message";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { conversationId } = ReadConversationValidator.parse(body);

    await db.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessage: {
          update: {
            read: true,
          },
        },
      },
    });

    return new Response(conversationId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data" + error.message, {
        status: 422,
      });
    }

    return new Response("Could not update conversation", { status: 500 });
  }
}
