import { Community, Subscription, User } from '@prisma/client';
import React, { FC } from 'react';
import UserAvatar from '@/components/ui/UserAvatar';
import { buttonVariants } from '../ui/Button';
import { Cake, Link } from 'lucide-react';
import NextLink from 'next/link';
import { cn } from '@/lib/utils';
import { Session } from 'next-auth';

interface ProfileCardProps {
  user: User | null;
  createdCommunities: Community[];
  subscriptions: Subscription[];
  session: Session | null;
}

const ProfileCard: FC<ProfileCardProps> = ({
  user,
  session,
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

  // replace "https://www.vangoghgallery.com/img/starry_night_full.jpg" with user?.coverImage

  const coverImage = 'https://www.vangoghgallery.com/img/starry_night_full.jpg';

  //  replace "This is a bio." with user?.bio

  const bio = 'This is where the bio would be.';

  // replace nullValue with user?.displayName

  const nullValue = null;

  const displayName = nullValue ?? user?.name;

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

  return (
    <div className='rounded-md bg-white shadow'>
      <div className='h-[30vh] md:h-[40vh] flex items-start relative'>
        <div
          id='cover-photo'
          className={`${
            user && coverImage && user.name ? 'bg-transparent' : 'bg-black'
          } w-full h-[75%] rounded-t-md shadow overflow-hidden`}
        >
          {user && coverImage && user.name && (
            <img
              alt={user?.name}
              src={coverImage}
              className='object-cover object-center'
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
            {session?.user.id === user?.id && (
              <NextLink
                href={`/u/${user?.username}/edit`}
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                  }),
                  'text-xs'
                )}
              >
                Edit Profile
              </NextLink>
            )}
          </div>
        </div>
      </div>

      <div className='px-3 md:px-5 pb-3 md:pb-5 space-y-2'>
        <div>
          <p className='text-lg font-bold'>{displayName}</p>
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

        <div className='flex items-start font-normal tracking-tight'>
          <Cake className='mr-2 h-4 w-4' />{' '}
          <span className='text-sm text-muted-foreground'>
            Born November 28, 2002
          </span>
        </div>

        <div className='flex font-normal'>
          <div className='flex items-end text-xs tracking-tight text-muted-foreground'>
            <span className='flex items-start'>
              <span className='font-bold text-black mr-1'>{`${ownedCommunities}`}</span>
              {`Communit${ownedCommunities === 1 ? 'y' : 'ies'} Created`}
            </span>
          </div>

          <div className='flex items-start ml-3'>
            <span className='flex items-end text-xs tracking-tight text-muted-foreground'>
              <span className='font-bold text-black mr-1'>{`${userSubs}`}</span>
              {`Subscription${userSubs === 1 ? '' : 's'}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
