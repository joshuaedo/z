import { Community, Subscription, User } from '@prisma/client';
import React, { FC } from 'react';
import { format } from 'date-fns';
import UserAvatar from '@/components/ui/UserAvatar';
import Image from 'next/image';
import { Button } from './Button';
import { Cake, Link, UserPlus, Users } from 'lucide-react';

interface ProfileCardProps {
  user: User | null;
  createdCommunities: Community[];
  subscriptions: Subscription[];
}

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

//   {user?.email}

//   {user?.id}

const ProfileCard: FC<ProfileCardProps> = ({
  user,
  subscriptions,
  createdCommunities,
}) => {
  const userSubs = subscriptions.length;

  const ownedCommunities = createdCommunities.length;

  const imageUrl = user?.image || null;

  const cleanedImageUrl = imageUrl?.replace(/=s\d+-[a-z]/, '');

  // replace "https://www.joshuaedo.com" with user?.link

  const href = 'https://www.joshuaedo.com';

  const link = href.replace(/^(https?:\/\/(www\.)?)?/, '');

  // replace "https://pbs.twimg.com/profile_banners/1107072179898933248/1676823891/600x200" with user?.coverImage

  const coverImage =
    'https://pbs.twimg.com/profile_banners/1107072179898933248/1676823891/600x200';

  //  replace "This is your bio." with user?.bio

  const bio = 'This is your bio';

  return (
    <div className='rounded-md bg-white shadow'>
      <div className='h-[30vh] md:h-[40vh] flex items-start relative'>
        <div
          id='cover-photo'
          className={`${
            user && coverImage && user.name ? 'bg-transparent' : 'bg-black'
          } w-full h-[75%] rounded-t-md shadow`}
        >
          {user && coverImage && user.name && (
            <Image
              alt={user?.name}
              src={coverImage}
              className='object-contain'
              fill
            />
          )}
        </div>

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

      <div className='px-3 md:px-5 pb-3 md:pb-5 space-y-2'>
        <div>
          <p className='text-lg font-bold'>{user?.name}</p>
          <p className='text-sm text-muted-foreground'>u/{user?.username}</p>
        </div>

        <div className=''>
          <p className='text-sm'>{bio}</p>
        </div>

        <div className='flex items-center'>
          <Link className='mr-2 h-4 w-4' />{' '}
          <span className='text-sm text-blue-500'>
            <a href={href}>{link}</a>
          </span>
        </div>

        <div className='flex items-center'>
          <Cake className='mr-2 h-4 w-4' />{' '}
          <span className='text-sm text-muted-foreground'>
            Born November 28, 2002
          </span>
        </div>

        <div className='flex'>
          <div className='flex items-center'>
            <Users className='mr-2 h-4 w-4' />{' '}
            <span className='text-sm text-muted-foreground'>
              <span className='items-center'>
                <span className='font-bold text-black'>{`${ownedCommunities}`}</span>{' '}
                {`communit${ownedCommunities === 1 ? 'y' : 'ies'} created`}
              </span>
            </span>
          </div>

          <div className='flex items-center ml-3'>
            <UserPlus className='mr-2 h-4 w-4' />{' '}
            <span className='text-sm text-muted-foreground'>
              <span className='items-center'>
                <span className='font-bold text-black'>{`${userSubs}`}</span>{' '}
                {`subscription${userSubs === 1 ? '' : 's'}`}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
