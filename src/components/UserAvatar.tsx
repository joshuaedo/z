import { User } from 'next-auth';
import React, { FC } from 'react'

interface UserAvatarProps {
    user: Pick<User, 'name' | 'image'>
}

const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
  return (
    <div>
     UserAvatar
    </div>
  )
}

export default UserAvatar;
