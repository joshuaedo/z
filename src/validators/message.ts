import { z } from 'zod';

export const MessageValidator = z.object({
  authorId: z.string(),
  text: z.string().optional(),
  image: z.string().optional(),
  recipientUsername: z.string(),
});

export type MessageRequest = z.infer<typeof MessageValidator>;
