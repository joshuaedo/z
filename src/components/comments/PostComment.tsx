'use client';
import React, { FC, useRef } from 'react';
import UserAvatar from '../ui/UserAvatar';
import { Comment, CommentVote, User } from '@prisma/client';
import { formatTimeToNow } from '@/lib/utils';
import CommentVotes from './CommentVotes';

type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
};
interface PostCommentProps {
  comment: ExtendedComment;
  postId: string;
  currentVote: CommentVote | undefined;
  votesAmt: number;
}

const PostComment: FC<PostCommentProps> = ({
  comment,
  votesAmt,
  currentVote,
  postId,
}) => {
  const commentRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={commentRef} className='flex flex-col space-y-3'>
      <div className='flex items-center'>
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className='h-6 w-6'
        />
        <div className='ml-2 flex items-center gap-x-2'>
          <p className='text-xs font-medium text-gray-900'>
            u/{comment.author.username}
          </p>
          <p className='max-h-40 truncate text-xs text-zinc-500'>
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>

      <p className='text-sm text-zinc-900'>{comment.text}</p>

      <div className='flex gap-2 items-center'>
        <CommentVotes
          commentId={comment.id}
          initialVote={currentVote}
          initialVotesAmt={votesAmt}
        />
      </div>
    </div>
  );
};

export default PostComment;
