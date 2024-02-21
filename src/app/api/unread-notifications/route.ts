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

      const notifications = await db.notification.findMany({
        where: {
          recipientId: zUser?.id,
          read: false,
        },
      });

      const unreadNotificationsCount = notifications?.length;

      const messages = await db.message.findMany({
        where: {
          recipientId: zUser?.id,
          read: false,
        },
      });

      const unreadMessagesCount = messages?.length;

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
