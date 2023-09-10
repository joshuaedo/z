'use client';

import { ExtendedPost } from '@/types/db';
import React, { FC, useState } from 'react';
import PostFeed from './PostFeed';

interface ProfileFeedProps {
  posts: ExtendedPost[];
  replies: ExtendedPost[];
}

const ProfileFeed: FC<ProfileFeedProps> = ({ posts, replies }) => {
  const [isReply, setIsReply] = useState<boolean>(false);

  return (
    <div className='space-y-6'>
      <div className='flex w-full items-center justify-center'>
        <div className='overflow-hidden max-w-4xl h-fit flex items-center justify-evenly rounded-lg shadow px-7 py-5 bg-white'>
          <button
            onClick={() => setIsReply(false)}
            className={`py-2 px-3 hover:bg-[#F8FAFC] cursor-pointer mr-4 ${
              isReply ? 'font-bold' : 'opacity-60'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setIsReply(true)}
            className={`py-2 px-3 hover:bg-[#F8FAFC] cursor-pointer ${
              !isReply ? 'font-bold' : 'opacity-60'
            }`}
          >
            Replies
          </button>
        </div>
      </div>
      {!isReply ? (
        <PostFeed initialPosts={posts} />
      ) : (
        <PostFeed initialPosts={replies} />
      )}
    </div>
  );
};

export default ProfileFeed;
