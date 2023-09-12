import { z } from "zod";

export const ProfileValidator = z.object({
  //  image: z.string(),
  profileTheme: z.string(),
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(50),
  displayName: z.string().max(50),
  bio: z.string().max(160),
  link: z.string().max(100),
  birthday: z.string().max(50),
});


export type UpdateProfilePayload = z.infer<typeof ProfileValidator>;
