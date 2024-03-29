'use client';

import { ExtendedPost } from '@/types/db';
import axios from 'axios';
import Post from '../../features/posts/Post';
import { useSession } from 'next-auth/react';
import { Suspense } from 'react';
import Loader from '@/components/ui/Loader';

interface ProfilePostsProps {
  initialPosts: ExtendedPost[];
  communityName?: string;
}

const ProfilePosts = async ({
  initialPosts,
  communityName,
}: ProfilePostsProps) => {
  const { data: session } = useSession();
  const posts = initialPosts;

  return (
    <Suspense fallback={<Loader />}>
      <ul className='flex flex-col space-y-6'>
        {posts.map((post, index) => {
          const votesAmt = post.votes.reduce((acc, vote) => {
            if (vote.type === 'UP') return acc + 1;
            if (vote.type === 'DOWN') return acc - 1;
            return acc;
          }, 0);

          const currentVote = post.votes.find(
            (vote) => vote.userId == session?.user.id
          );

          return (
            <li key={post.id}>
              <Post
                currentVote={currentVote}
                votesAmt={votesAmt}
                commentAmt={post.comments.length}
                post={post}
                communityName={post.community.name}
              />
            </li>
          );
        })}
        <li className='w-full text-xs py-6 flex items-center justify-center'>
          <span>- end of feed -</span>
        </li>
      </ul>
    </Suspense>
  );
};

export default ProfilePosts;
