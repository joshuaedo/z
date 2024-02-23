import { z } from "zod";

export const MessageValidator = z.object({
  authorId: z.string(),
  text: z.string().optional(),
  image: z.string().optional(),
  recipientUsername: z.string(),
});

export const ReadConversationValidator = z.object({
  conversationId: z.string(),
});

export type ReadConversationPayload = z.infer<typeof ReadConversationValidator>;
export type MessageRequest = z.infer<typeof MessageValidator>;
