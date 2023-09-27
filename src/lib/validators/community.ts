import { z } from "zod";

export const CommunityValidator = z.object({
  id?: z.string(),
  name: z.string().min(3).max(21),
  description: z.string().max(160),
  image: z.string(),
});

export const CommunitySubscriptionValidator = z.object({
  communityId: z.string(),
});

export type CreateCommunityPayload = z.infer<typeof CommunityValidator>;
export type SubscribeToCommunityPayload = z.infer<
  typeof CommunitySubscriptionValidator
>;
