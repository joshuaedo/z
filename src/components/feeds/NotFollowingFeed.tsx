'use client';

import { ExtendedPost } from '@/types/db';
import { FC, useEffect, useRef } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Post from '../posts/Post';
import { Loader2 } from 'lucide-react';
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { Suspense } from 'react';
import Loader from '@/components/ui/Loader';

interface NotFollowingFeedProps {
  initialPosts: ExtendedPost[];
  communityName?: string;
}

const NotFollowingFeed: FC<NotFollowingFeedProps> = ({
  initialPosts,
  communityName,
}) => {
  const lastPostRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data: session } = useSession();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['infinite-query'],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts/not-following?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!communityName ? `&communityName=${communityName}` : '');

      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

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
        {isFetchingNextPage && (
          <div className='py-2 text-zinc-900 flex items-center justify-center'>
            <Loader2 className='animate-spin' />
          </div>
        )}
        <li className='w-full text-xs py-6 flex items-center justify-center'>
          <span>- end of feed -</span>
        </li>
      </ul>
    </Suspense>
  );
};

export default NotFollowingFeed;
