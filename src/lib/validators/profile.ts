import { z } from "zod";

export const ProfileValidator = z.object({
  image: z.string(),
  profileTheme: z.string(),
  username: z
    .string()
    .min(1, {
      message: "Username must be at least 1 character.",
    })
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "Username can only contain letters, numbers, and underscores. No spaces.",
    }),
  displayName: z.string().max(50),
  bio: z.string().max(160),
  link: z.string().max(100),
  birthday: z.string().max(50),
});

export type UpdateProfilePayload = z.infer<typeof ProfileValidator>;
