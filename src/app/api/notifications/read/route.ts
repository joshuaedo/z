import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ReadNotificationValidator } from "@/validators/notification";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { notificationId } = ReadNotificationValidator.parse(body);

    await db.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        read: true,
      },
    });

    return new Response(notificationId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data" + error.message, {
        status: 422,
      });
    }

    return new Response("Could not update notification", { status: 500 });
  }
}
