import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { CommentValidator } from '@/lib/validators/comment';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { postId, text, replyToId } = CommentValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const newComment = await db.comment.create({
      data: {
        text,
        postId,
        userId: session.user.id,
        authorId: session.user.id,
        replyToId,
      },
    });

    const findPost = await db.post.findUnique({
      where: {
        id: postId
      }
    })

    const findNotificationRecipient = await db.user.findUnique({
      where: {
        id: findPost?.authorId
      }
    })

    const notificationData = {
      type: 'comment',
      recipientId: findNotificationRecipient?.id,
      senderId: session.user.id,
      read: false,

      postId,
      commentId: newComment?.id,
      commentText: text,
    };

    await db.notification.create({
      data: notificationData,
    });

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data' + error.message, {
        status: 422,
      });
    }

    return new Response('Could not create comment', { status: 500 });
  }
}
