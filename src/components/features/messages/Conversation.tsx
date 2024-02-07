'use client';

import React, { FC } from 'react';
import ConversationBackground from './ConversationBackground';

interface ConversationProps {}

const Conversation: FC<ConversationProps> = ({}) => {
  return (
    <main className='relative'>
      <ConversationBackground />
      <div
        className='absolute max-h-[calc(100svh-88px)] 
      md:max-h-[calc(100svh-14rem)] 
      w-screen md:w-[42.3rem] top-0 pt-14 px-2 md:pt-0 overflow-hidden'
      >
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
        <p>ggggggggg</p>
      </div>
    </main>
  );
};

export default Conversation;
