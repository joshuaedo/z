// "use client";

import { Post, User, Vote } from '@prisma/client';
import { FC } from 'react';

interface PostProps {
  communityName: string
  post: Post & {
    author: User
    votes: Vote[]
  }
}

const Post: FC<PostProps> = ({communityName, post }) => {
  return (
    <>
      <div className='rounded-md bg-white shadow'>
        <div className='px-6 py-4 justify-between'>
        {/* PostVotes */}

          <div className=''>
           <div className='max-h-40 mt-1 text-xs text-gray-500'>
             { communityName ? (
              <>
              <a className='underline text-zinc-900 text-sm underline-offset-2' 
               href={`z/${communityName}`}>
               z/{communityName}
              </a>

              <span className='px-1'>•</span>
              </>
            ) : null }
            <span className=''>{`Posted by u/${post.author.name}`}</span>
           </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
