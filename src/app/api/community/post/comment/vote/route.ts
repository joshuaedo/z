import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { getUserById } from '@/lib/user';
import { CommentVoteValidator } from '@/validators/vote';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { commentId, voteType } = CommentVoteValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const findComment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    const findNotificationRecipient = await getUserById(findComment?.authorId);

    const notificationData = {
      type: 'comment_vote',
      recipientId: findNotificationRecipient?.id,
      senderId: session.user.id,
      read: false,

      commentId,
      voteType,
    };

    const existingVote = await db.commentVote.findFirst({
      where: {
        userId: session.user.id,
        commentId,
      },
    });

    if (existingVote) {
      if (existingVote.type === voteType) {
        await db.commentVote.delete({
          where: {
            userId_commentId: {
              commentId,
              userId: session.user.id,
            },
          },
        });
        return new Response('OK');
      } else {
        await db.commentVote.update({
          where: {
            userId_commentId: {
              commentId,
              userId: session.user.id,
            },
          },
          data: {
            type: voteType,
          },
        });
      }
      return new Response('OK');
    }

    await db.commentVote.create({
      data: {
        type: voteType,
        userId: session.user.id,
        commentId,
      },
    });

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

    return new Response('Could not register your vote', { status: 500 });
  }
}
