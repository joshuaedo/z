import { z } from "zod";

export const ReadNotificationValidator = z.object({
  notificationId: z.string(),
});

export type ReadNotificationPayload = z.infer<typeof ReadNotificationValidator>;
