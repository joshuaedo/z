import Image from 'next/image';
import React, { FC } from 'react';

interface ConversationProps {}

const Conversation: FC<ConversationProps> = ({}) => {
  return (
    <main className='h-[58svh] md:h-[70svh] relative'>
      <Image
        src='/chat-doodle-dark-md.jpg'
        height={2662}
        width={1498}
        alt='chat doodle light'
        className='h-full w-full object-cover rounded-lg absolute z-[-2]'
      />
    </main>
  );
};

export default Conversation;
