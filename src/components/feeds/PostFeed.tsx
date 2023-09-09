import { ExtendedPost } from '@/types/db';
import { FC } from 'react';
import { useSession } from 'next-auth/react';
import Post from '../posts/Post';

interface PostFeedProps {
  initialPosts: ExtendedPost[];
}

const PostFeed: FC<PostFeedProps> = ({ initialPosts }) => {
  const { data: session } = useSession();

  const posts = initialPosts;

  return (
    <ul className='flex flex-col space-y-6'>
      {posts.map((post) => {
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
    </ul>
  );
};

export default PostFeed;
