import { z } from 'zod';

export const MessageValidator = z.object({
  authorId: z.string(),
  text: z.string().optional(),
  image: z.string().optional(),
  recieverUsername: z.string(),
});

export type MessageRequest = z.infer<typeof MessageValidator>;
