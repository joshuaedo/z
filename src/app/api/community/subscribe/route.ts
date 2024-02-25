import { getAuthSession } from '@/lib/auth';
import { getCommunityById } from '@/lib/community';
import { db } from '@/lib/db';
import { getUserById } from '@/lib/user';
import { CommunitySubscriptionValidator } from '@/validators/community';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    const { communityId } = CommunitySubscriptionValidator.parse(body);

    const subscriptionExists = await db.subscription.findFirst({
      where: {
        communityId,
        userId: session.user.id,
      },
    });

    if (subscriptionExists) {
      return new Response('You are already subscribed to this community', {
        status: 400,
      });
    }

    await db.subscription.create({
      data: {
        communityId,
        userId: session.user.id,
      },
    });

    const findCommunity = await getCommunityById(communityId);

    let findNotificationRecipient;

    if (findCommunity?.creatorId) {
      findNotificationRecipient = await getUserById(findCommunity?.creatorId);
    }

    const notificationData = {
      type: 'subscribe',
      recipientId: findNotificationRecipient?.id,
      senderId: session.user.id,
      read: false,

      subscriptionUserId: session.user.id,
      subscriptionCommunityId: communityId,
    };

    await db.notification.create({
      data: notificationData,
    });

    return new Response(communityId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid request data' + error.message, {
        status: 422,
      });
    }

    return new Response('Could not subscribe to community', { status: 500 });
  }
}
