'use client';

import { Session } from 'next-auth';
import Notification, { ExtendedNotification } from './Notification';

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
              return <div key={notification.id}></div>;
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

export default Notifications;
