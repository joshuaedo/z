'use client';

import { formatTimeToNow } from '@/lib/utils';
import { Post, User, Vote } from '@prisma/client';
import { MessageSquare } from 'lucide-react';
import { FC, useRef } from 'react';
import EditorOutput from '../editor/EditorOutput';
import PostVoteClient from './post-vote/PostVoteClient';

type PartialVote = Pick<Vote, 'type'>;

interface PostProps {
  communityName: string;
  post: Post & {
    author: User;
    votes: Vote[];
  };
  commentAmt: number;
  votesAmt: number;
  currentVote?: PartialVote;
}

const Post: FC<PostProps> = ({
  communityName,
  post,
  commentAmt,
  votesAmt,
  currentVote,
}) => {
  const pRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className='rounded-md bg-white shadow'>
        <div className='pr-4 md:px-6 py-4 flex justify-between'>
          <PostVoteClient
            postId={post.id}
            initialVotesAmt={votesAmt}
            initialVote={currentVote?.type}
          />

          <div className='w-0 flex-1'>
            <div className='max-h-40 mt-1 text-2xs text-gray-500'>
              {communityName ? (
                <>
                  <a
                    className='underline text-zinc-900 text-sm underline-offset-2'
                    href={`/z/${communityName}`}
                  >
                    z/{communityName}
                  </a>

                  <span className='px-1'>•</span>
                </>
              ) : null}
              <span className=''>{`Posted by u/${post.author.username} `}</span>
              {formatTimeToNow(new Date(post.createdAt))}
            </div>

            <a href={`/z/${communityName}/post/${post.id}`}>
              <h1 className='text-lg font-semibold py-2 leading-6 text-gray-900'>
                {post.title}
              </h1>
            </a>

            <div
              className='relative text-sm max-h-40 w-full overflow-clip'
              ref={pRef}
            >
              <EditorOutput content={post.content} />

              {pRef.current?.clientHeight === 160 ? (
                <div className='absolute bottom-0 h-24 w-full bg-gradient-to-t from-white to-transparent' />
              ) : null}
            </div>
          </div>
        </div>

        <div className='bg-gray-50 z-20 text-sm p-4 sm:px-6'>
          <a
            className='w-fit flex items-center gap-2'
            href={`/z/${communityName}/post/${post.id}`}
          >
            <MessageSquare className='h-4 w-4' />
            {` ${commentAmt} comment${commentAmt === 1 ? '' : 's'}`}
          </a>
        </div>
      </div>
    </>
  );
};

export default Post;
