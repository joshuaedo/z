import React, { FC } from 'react';
import UserAvatar from '../user/UserAvatar';
import { ArrowLeft } from 'lucide-react';

interface ConversationHeaderProps {
  displayName: string;
  image?: string;
  name?: string;
}

const ConversationHeader: FC<ConversationHeaderProps> = ({
  displayName,
  image,
  name,
}) => {
  return (
    <header className='h-[18svh] flex items-center gap-x-3 font-semibold'>
      <ArrowLeft className='h-6 w-6 mr-6' />
      <UserAvatar
        user={{
          name,
          image,
        }}
        className='h-6 w-6'
      />
      <h1>{displayName}</h1>
    </header>
  );
};

export default ConversationHeader;
