'use client';

import { ExtendedPost } from '@/types/db';
import axios from 'axios';
import Post from '../posts/Post';
import { getAuthSession } from '@/lib/auth';

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  communityName?: string;
}

const PostFeed = async ({ initialPosts, communityName }: PostFeedProps) => {
  const session = await getAuthSession();
  const posts = initialPosts;

  return (
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

        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post
                currentVote={currentVote}
                votesAmt={votesAmt}
                commentAmt={post.comments.length}
                post={post}
                communityName={post.community.name}
              />
            </li>
          );
        } else {
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
        }
      })}
      <li className='w-full text-xs py-6 flex items-center justify-center'>
        <span>- end of feed -</span>
      </li>
    </ul>
  );
};

export default PostFeed;
