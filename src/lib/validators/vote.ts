import {z} from "zod";

export const PostVoteValidator = z.object({
    postId: z.string(),
    voteType: z.enum(["UP", "DOWN"]),
})

export type PostVoteRequest = z.infer<typeof PostVoteValidator>

export const PostCommentValidator = z.object({
    commentId: z.string(),
    voteType: z.enum(["UP", "DOWN"]),
})

export type PostCommentRequest = z.infer<typeof PostCommentValidator>