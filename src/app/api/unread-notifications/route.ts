import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { UnreadNotifications } from "@/types/db";
import { z } from "zod";

export async function GET() {
  try {
    const session = await getAuthSession();
    const zUser = session?.user;

    if (zUser) {
      const isNewHomeFeed = false;

      const isNewExploreFeed = false;

      const isJoinedNewCommunity = false;

      const unreadNotificationsCount = await db.notification.count({
        where: {
          recipientId: zUser?.id,
          read: false,
          senderId: { not: zUser?.id }, // Exclude notifications sent by the user to themselves
        },
      });

      const unreadMessagesCount = await db.conversation.count({
        where: {
          participantIds: {
            contains: zUser?.id,
          },
          lastMessage: {
            read: false,
            authorId: { not: zUser?.id }, // Exclude messages sent by the user
          },
        },
      });

      const res: UnreadNotifications = {
        isNewHomeFeed,
        isNewExploreFeed,
        isJoinedNewCommunity,
        unreadNotificationsCount,
        unreadMessagesCount,
      };

      return new Response(JSON.stringify(res));
    } else {
      return new Response("Unauthorized", { status: 401 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not retrieve unread notifications", {
      status: 500,
    });
  }
}
