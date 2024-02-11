import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { redis } from '@/lib/redis';
import { getUserByUsername } from '@/lib/user';
import { CachedMessage } from '@/types/redis';
import { MessageValidator } from '@/validators/message';
// import { nanoid } from 'nanoid';
import { z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { authorId, recipientUsername, image, text } =
      MessageValidator.parse(body);

    // const messageId = nanoid(10);

    // Check if message is empty
    if (image?.trim() === '' && text?.trim() === '') {
      return new Response('Empty');
    }

    //   get recipient and author
    const recipient = await getUserByUsername(recipientUsername);
    const session = await getAuthSession();
    const author = session?.user;

    if (!recipient || !author) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Check if user is trying to send message to himself
    if (recipient?.id === author?.id) {
      return new Response('Not allowed', { status: 401 });
    }

    // Check if conversation exists
    const conversation = await db.conversation.findFirst({
      where: {
        participantIds:
          `${author?.id}_${recipient?.id}` || `${recipient?.id}_${author?.id}`,
      },
    });

    // If conversation does not exist, create a new one
    if (!conversation) {
      try {
        const newConversation = await db.conversation.create({
          data: {
            participantIds: `${author?.id}_${recipient?.id}`,
            messages: {
              create: [
                {
                  authorId,
                  text,
                  image,
                  recipientId: recipient?.id,
                  read: false,
                },
              ],
            },
          },
          include: { messages: true },
        });

        // Update last messageId in new conversation
        await db.conversation.update({
          where: {
            id: newConversation.id,
          },
          data: {
            lastMessageId: newConversation.messages[0].id,
          },
        });

        const cachedMessagePayload: CachedMessage = {
          authorId,
          text,
          image,
          recipientId: recipient?.id,
          read: false,
          createdAt: newConversation.messages[0].createdAt,
        };

        await redis.hset(
          `message:${newConversation.messages[0].id}`,
          cachedMessagePayload
        );

        return new Response(cachedMessagePayload.text, { status: 200 });
      } catch (error: any) {
        if (error instanceof z.ZodError) {
          return new Response(error.message, { status: 400 });
        }
        return new Response(
          `${error.message}: 'Could not send your message at this time. Please try later'`,
          { status: 500 }
        );
      }
    }

    // Create message
    const newMessage = await db.message.create({
      data: {
        authorId,
        text,
        image,
        conversationId: conversation?.id,
        recipientId: recipient?.id,
        read: false,
      },
    });

    // Update last messageId in conversation
    await db.conversation.update({
      where: {
        id: conversation?.id,
      },
      data: {
        lastMessageId: newMessage.id,
      },
    });

    const cachedMessagePayload: CachedMessage = {
      authorId,
      text,
      image,
      recipientId: recipient?.id,
      read: false,
      createdAt: newMessage.createdAt,
    };

    await redis.hset(`message:${newMessage.id}`, cachedMessagePayload);

    return new Response(cachedMessagePayload.text, { status: 200 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response(
      `${error.message}: 'Could not send your message at this time. Please try later'`,
      { status: 500 }
    );
  }
}
