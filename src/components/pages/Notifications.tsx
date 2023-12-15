'use client';

import { FC } from 'react';
import { Community } from '@prisma/client';
import { Session } from 'next-auth';
import Notification from '../notifications/Notification';

interface NotificationsProps {
  session: Session | null;
}

const Notifications: FC<NotificationsProps> = ({ session }) => {

  return (
    <main className='space-y-6'>
      <h2 className='font-bold text-3xl md:text-4xl'>Notifications</h2>
      <div className='rounded-lg bg-white dark:bg-[#000000] shadow dark:border border-[#333333] px-8 pb-8 pt-4 space-y-2 '>
        <ul id='notifications' className=' space-y-3'>
          {/* Map notifications */}
          <Notification />
        </ul>
      </div>
      {/* {notis.length < 1 && (
        <li className='w-full text-xs py-3 flex items-center justify-center'>
          <span>- your notifications show up here -</span>
        </li>
      )} */}
    </main>
  );
};

export default Notifications;
