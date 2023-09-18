import { z } from 'zod';

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be longer than 3 characters' })
    .max(100, { message: 'Title cannot be longer than 100 characters' }),
  communityId: z.string(),
  content: z.any(),
});

export type PostCreationRequest = z.infer<typeof PostValidator>;
