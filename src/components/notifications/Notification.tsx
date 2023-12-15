import React, { FC } from 'react';

interface NotificationProps {}

const Notification: FC<NotificationProps> = ({}) => {
  return (
    <div>
      <hr />A notification
      {/* <li key={community.id} className='py-1 flex items-center rounded-lg p-1'>
        <Link
          href={`z/${community.name}`}
          className='w-full h-full flex items-center gap-x-4 md:gap-x-5'
        >
          <CommunityAvatar community={community} className='h-12 w-12' />
          <div>
            <p className='hidden md:block font-medium'>
              {`z/${
                community.name.length > 16
                  ? community.name.slice(0, 15) + '...'
                  : community.name
              }`}
            </p>
            <p className='md:hidden font-medium'>
              {`z/${
                community.name.length > 11
                  ? community.name.slice(0, 10) + '...'
                  : community.name
              }`}
            </p>

            <div className='flex items-center pt-2'>
              <Users className='mr-2 h-4 w-4 opacity-70' />{' '}
              <span className='text-xs text-muted-foreground'>
                <span>{`${community._count?.subscribers ?? 0} member${
                  community._count?.subscribers === 1 ? '' : 's'
                }`}</span>
              </span>
            </div>
          </div>
        </Link>
      </li> */}
    </div>
  );
};

export default Notification;
