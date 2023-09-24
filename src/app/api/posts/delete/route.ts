import { db } from "@/lib/db";
import { z } from "zod";
import { getAuthSession } from "@/lib/auth";
import { PostDeletionValidator } from "@/lib/validators/post";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Sign in", { status: 401 });
    }

    const body = await req.json();

    const { postId, postAuthorId } = PostDeletionValidator.parse(body);

    if (postAuthorId !== session?.user.id) {
      return new Response("You are not authorized to delete this post", {
        status: 401,
      });
    }

    const existingPost = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        comments: {
          include: {
            votes: true, 
          },
        },
      },
    });

    const existingComments = await db.comment.findMany({
      where: {
        postId: existingPost?.id,
      },
      include: {
        replies: true, // Include associated replies
      },
    });
    
    for (const comment of existingComments) {
      // Attempt to delete the comment and handle any potential errors
      try {
        // Delete associated replies first
        for (const reply of comment.replies) {
          await db.comment.delete({
            where: {
              id: reply?.id,
            },
          });
        }
    
        // Now delete the comment itself
        await db.comment.delete({
          where: {
            id: comment?.id,
          },
        });
      } catch (error) {
        // Handle errors, log them, or skip the deletion if the comment no longer exists
        console.error(`Error deleting comment ${comment?.id}:`, error);
      }
    }

    // Now you can safely delete the post
    await db.post.delete({
      where: {
        id: existingPost?.id,
      },
    });
    return new Response(
      JSON.stringify({ message: "Post deleted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: "Invalid request data " + error.message }),
        {
          status: 422,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Could not delete post, please try again later " + error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
