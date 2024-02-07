'use client';

import { useCustomToast } from '@/hooks/use-custom-toast';
import { usePrevious } from '@mantine/hooks';
import { CommentVote, VoteType } from '@prisma/client';
import { FC, useState } from 'react';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { CommentVoteRequest } from '@/validators/vote';
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';

interface CommentVotesProps {
  commentId: string;
  initialVotesAmt: number;
  initialVote?: Pick<CommentVote, 'type'>;
}

const CommentVotes: FC<CommentVotesProps> = ({
  commentId,
  initialVote,
  initialVotesAmt,
}) => {
  const { loginToast } = useCustomToast();
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote);

  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: CommentVoteRequest = {
        commentId,
        voteType,
      };

      await axios.patch('/api/community/post/comment/vote', payload);
    },
    onError: (err, voteType) => {
      if (voteType === 'UP') setVotesAmt((prev) => prev - 1);
      else setVotesAmt((prev) => prev + 1);

      // reset current vote
      setCurrentVote(prevVote);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: 'Action failed',
        description: 'Your vote was not registered, please try again.',
        variant: 'destructive',
      });
    },
    onMutate: (type) => {
      if (currentVote?.type === type) {
        setCurrentVote(undefined);
        if (type === 'UP') setVotesAmt((prev) => prev - 1);
        else if (type === 'DOWN') setVotesAmt((prev) => prev + 1);
      } else {
        setCurrentVote({ type });
        if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === 'DOWN')
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  return (
    <div className='flex gap-2'>
      <button
        onClick={() => vote('UP')}
        aria-label='upvote'
        className='py-2 flex justify-center items-center'
      >
        <ArrowBigUp
          className={cn('h-4 w-4 md:h-5 md:w-5 text-muted-foreground', {
            'text-purple-500 fill-purple-500': currentVote?.type === 'UP',
          })}
        />
      </button>

      <p className='text-center py-2 font-medium text-sm '>{votesAmt}</p>

      <button
        onClick={() => vote('DOWN')}
        aria-label='upvote'
        className='py-2 flex justify-center items-center'
      >
        <ArrowBigDown
          className={cn('h-4 w-4 md:h-5 md:w-5 text-muted-foreground', {
            'text-red-500 fill-red-500': currentVote?.type === 'DOWN',
          })}
        />
      </button>
    </div>
  );
};

export default CommentVotes;
