import { Community, Subscription, User } from '@prisma/client';
import React, { FC } from 'react';
import { format } from 'date-fns';
import UserAvatar from '@/components/ui/UserAvatar';
import Image from 'next/image';
import { Button } from './Button';

interface ProfileCardProps {
  user: User | null;
  createdCommunities: Community[];
  subscriptions: Subscription[];
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


const ProfileCard: FC<ProfileCardProps> = ({ user, subscriptions, createdCommunities }) => {
  const imageUrl = user?.image || null;

  const cleanedImageUrl = imageUrl?.replace(/=s\d+-[a-z]/, '');

  const userSubs = subscriptions.length

  const ownedCommunities = createdCommunities.length

  return (
    <div className='rounded-md bg-white shadow'>


      <div className='h-[30vh] md:h-[40vh] flex items-start relative'>
        <div
          id='cover-photo-fallback'
          className='bg-black w-full h-[75%] rounded-t-md shadow'
        />
        <div className='h-[15vh] md:h-[17vh] w-full absolute z-2 bottom-0 flex items-center px-3 md:px-5 justify-between '>
          <div className='h-[12vh] md:h-[17vh] w-[12vh] md:w-[17vh] border-2 md:border-4 rounded-[50%] border-white'>
            <UserAvatar
              user={{
                name: user?.name || null,
                image: cleanedImageUrl,
              }}
              className='w-full h-full object-contain'
            />
          </div>

          <div className='h-[12vh] md:h-[17vh] w-[12vh] md:w-[17vh] flex items-end justify-end'>
            <Button variant='outline' size='sm' className='text-xs'>
              Edit Profile
            </Button>
          </div>
        </div>
      </div>


      <div>
        <p>{user?.name}</p>
        <p>{user?.username}</p>
      </div>


      <div>
        <p>{userSubs} subscriptions</p>
        <p>{ownedCommunities} communities created</p>
      </div>

      
    </div>
  );
};

export default ProfileCard;
