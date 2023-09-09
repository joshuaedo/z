import { User } from '@prisma/client';
import React, { FC } from 'react';
import { format } from 'date-fns';
import UserAvatar from '@/components/ui/UserAvatar';
import Image from 'next/image';
import { Button } from './Button';

interface ProfileCardProps {
  user: User | null;
}
//   <p>{user?.bio}</p>

//   <time dateTime={user?.emailVerified?.toDateString()}>
//     {user?.emailVerified
//       ? `Joined on ${format(user.emailVerified, 'MMMM d, yyyy')}`
//       : ''}
//   </time>

//   <time dateTime={user?.birthday?.toDateString()}>
//     {user?.birthday
//       ? `Birthday is ${format(user.birthday, 'MMMM d, yyyy')}`
//       : ''}
//   </time>

//   <div className='relative w-full min-h-[15rem]'>
//     {user && user.coverImage && user.name && (
//       <Image
//         alt={user?.name}
//         src={user?.coverImage}
//         className='object-contain'
//         fill
//       />
//     )}
//   </div>

//   <p>{user?.email}</p>

//   <p>{user?.id}</p>

//   <p>{user?.link}</p>

//   <p>{user?.name}</p>

//   <p>{user?.username}</p>

const ProfileCard: FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className='rounded-md bg-white shadow md:px-6 py-4'>
      <div className='h-[40vh] flex items-start relative'>
        <div id='cover-photo-fallback' className='bg-black w-full h-[75%]' />
        <div className='h-[50%] absolute z-2 bottom-0 flex items-center justfify-between'>
          <UserAvatar
            user={{
              name: user?.name || null,
              image: user?.image || null,
            }}
            className='h-[80%]'
          />
          <Button variant='subtle'>Edit Profile</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
