'use client';

import { Session } from 'next-auth';
import Notification, {
  ExtendedNotification,
} from '../notifications/Notification';

type NotificationsProps = {
  session: Session | null;
  notifications: ExtendedNotification[] | undefined | null;
};

const Notifications = ({ session, notifications }: NotificationsProps) => {
  return (
    <main className='space-y-6'>
      <h2 className='font-bold text-3xl md:text-4xl'>Notifications</h2>
      <ul id='notifications' className='space-y-3'>
        {notifications &&
          notifications.map((notification) => {
            if (session?.user.id === notification.senderId) {
              return <></>;
            }

            return (
              <div
                key={notification.id}
                className='rounded-md bg-white dark:bg-[#000000] shadow dark:border border-[#333333] p-4'
              >
                <Notification notification={notification} />
              </div>
            );
          })}
      </ul>

      <li className='w-full text-xs py-3 flex items-center justify-center'>
        <span>- your notifications show up here -</span>
      </li>
    </main>
  );
};

export default Notifications;
