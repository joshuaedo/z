import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be longer than 3 characters" })
    .max(150, { message: "Title cannot be longer than 150 characters" }),
  communityId: z.string(),
  content: z.any(),
});

export type PostCreationRequest = z.infer<typeof PostValidator>;

export const PostDeletionValidator = z.object({
  postId: z.string(),
  postAuthorId: z.string(),
});

export type PostDeletionRequest = z.infer<typeof PostDeletionValidator>;
