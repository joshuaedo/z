import { ExtendedNotification } from '@/components/features/notifications/Notification';
import { db } from '@/lib/db';

type getNotificationsOptions = {
  recipientId?: string;
  recipientName?: string;
};

const getNotifications = async ({
  recipientId,
  recipientName,
}: getNotificationsOptions) => {
  const whereCondition: any = {};

  if (recipientId) {
    whereCondition.recipientId = recipientId;
  } else if (recipientName) {
    whereCondition.recipientName = recipientName;
  }

  const notifications = await db.notification.findMany({
    where: {
      ...whereCondition,
      read: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      sender: true,
      post: {
        include: {
          community: true,
          votes: true,
          author: true,
          comments: true,
        },
      },
      subscribe: {
        include: {
          community: true,
        },
      },
      comment: true,
    },
  });

  return notifications as ExtendedNotification[];
};

const getNotificationsByName = async (name: string) => {
  return await getNotifications({ recipientName: name });
};

const getNotificationsById = async (id: string) => {
  return await getNotifications({ recipientId: id });
};

export { getNotificationsByName, getNotificationsById, getNotifications };
