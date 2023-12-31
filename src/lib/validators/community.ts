import { z } from "zod";

export const EditCommunityValidator = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3)
    .max(21)
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "Community name can only contain letters, numbers, and underscores. No spaces.",
    }),
  description: z.string().max(160),
  image: z.string(),
});

export const CommunityValidator = z.object({
  name: z
    .string()
    .min(3)
    .max(21)
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "Community name can only contain letters, numbers, and underscores. No spaces.",
    }),
  description: z.string().max(160),
  image: z.string(),
});

export const CommunitySubscriptionValidator = z.object({
  communityId: z.string(),
});

export type CreateCommunityPayload = z.infer<typeof CommunityValidator>;
export type EditCommunityPayload = z.infer<typeof EditCommunityValidator>;
export type SubscribeToCommunityPayload = z.infer<
  typeof CommunitySubscriptionValidator
>;
