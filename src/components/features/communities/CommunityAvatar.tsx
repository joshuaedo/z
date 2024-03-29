import React, { FC } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/Avatar';
import { Icons } from '../../ui/Icons';
import { AvatarProps } from '@radix-ui/react-avatar';
import { Community } from '@prisma/client';

interface communityAvatarProps extends AvatarProps {
  community?: Community;
  fallbackClassName?: string;
}

const CommunityAvatar: FC<communityAvatarProps> = ({
  community,
  fallbackClassName,
  ...props
}) => {
  return (
    <Avatar {...props}>
      {community?.image ? (
        <AvatarImage
          src={community.image}
          alt='profile picture'
          referrerPolicy='no-referrer'
        />
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{community?.name}</span>
          <Icons.communityFallbackLogoTwo className={fallbackClassName} />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default CommunityAvatar;
