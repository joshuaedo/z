import { getAuthSession } from '@/lib/auth';
import { Metadata } from 'next';
import { getUserById } from '@/lib/user';
import { getNotificationsById } from '@/lib/notification';
import { ExtendedNotification } from '@/types/db';
import Notification from '@/components/features/notifications/Notification';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function generateMetadata(): Promise<Metadata> {
  const session = await getAuthSession();
  let user;
  if (session) {
    user = await getUserById(session?.user?.id);
  }

  const title = `Notifications • Z`;

  const description = `See your notifications on Z.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: user?.image ?? 'https://joshuaedo.sirv.com/Z/Z.png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [user?.image ?? 'https://joshuaedo.sirv.com/Z/Z.png'],
    },
  };
}

const NotificationsPage = async () => {
  let notifications: ExtendedNotification[] = [];
  const session = await getAuthSession();
  if (session) {
    notifications = await getNotificationsById(session?.user.id);
  }

  return (
    <main className='space-y-6'>
      <ul id='notifications' className='space-y-3'>
        {notifications &&
          notifications.map((notification) => {
            if (session?.user.id === notification.senderId) {
              return <div key={notification.id} />;
            }

            return (
              <Notification key={notification.id} notification={notification} />
            );
          })}
      </ul>

      <li className='w-full text-xs py-3 flex items-center justify-center'>
        <span>- your notifications show up here -</span>
      </li>
    </main>
  );
};

export default NotificationsPage;
