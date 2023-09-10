import { Community, Subscription, User } from '@prisma/client';
import React, { FC } from 'react';
import { format } from 'date-fns';
import UserAvatar from '@/components/ui/UserAvatar';
import Image from 'next/image';
import { Button } from './Button';
import { UserPlus, Users } from 'lucide-react';

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

const ProfileCard: FC<ProfileCardProps> = ({
  user,
  subscriptions,
  createdCommunities,
}) => {
  const imageUrl = user?.image || null;

  const cleanedImageUrl = imageUrl?.replace(/=s\d+-[a-z]/, '');

  const userSubs = subscriptions.length;

  const ownedCommunities = createdCommunities.length;

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

      <div className='px-3 md:px-5 py-3 md:py-5 space-y-2'>
        <div>
          <p className='text-lg font-bold'>{user?.name}</p>
          <p className='text-sm text-muted-foreground'>u/{user?.username}</p>
        </div>

        <div className=''>
          <p className='text-sm'>This is your bio.</p>
        </div>

        <div className='flex items-center'>
          <Users className='mr-2 h-4 w-4 opacity-70' />{' '}
          <span className='text-xs text-muted-foreground'>
            <span>
              <span>{`${ownedCommunities}`}</span>
              {''}
              {`communit${ownedCommunities === 1 ? 'y' : 'ies'} created`}
            </span>
          </span>
        </div>

        <div className='flex items-center'>
          <UserPlus className='mr-2 h-4 w-4 opacity-70' />{' '}
          <span className='text-xs text-muted-foreground'>
            <span>
              <span>{`${userSubs}`}</span>
              {''}
              {`subscription${userSubs === 1 ? '' : 's'}`}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
