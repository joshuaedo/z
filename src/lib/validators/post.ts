import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .max(250, { message: "Title cannot be longer than 250 characters" }),
  communityId: z.string(),
  content: z.any(),
});

export type PostCreationRequest = z.infer<typeof PostValidator>;

export const PostDeletionValidator = z.object({
  postId: z.string(),
  postAuthorId: z.string(),
});

export type PostDeletionRequest = z.infer<typeof PostDeletionValidator>;
