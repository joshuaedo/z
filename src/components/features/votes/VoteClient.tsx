'use client';

import { useCustomToast } from '@/hooks/use-custom-toast';
import { usePrevious } from '@mantine/hooks';
import { VoteType } from '@prisma/client';
import { FC, useEffect, useState } from 'react';
import { Button } from '../../ui/Button';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { VoteRequest } from '@/validators/vote';
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';

interface VoteClientProps {
  postId: string;
  initialVotesAmt: number;
  initialVote?: VoteType | null;
}

const VoteClient: FC<VoteClientProps> = ({
  postId,
  initialVote,
  initialVotesAmt,
}) => {
  const { loginToast } = useCustomToast();
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote);

  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: VoteRequest = {
        postId,
        voteType,
      };

      await axios.patch('/api/community/post/vote', payload);
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
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        setCurrentVote(undefined);
        if (type === 'UP') setVotesAmt((prev) => prev - 1);
        else if (type === 'DOWN') setVotesAmt((prev) => prev + 1);
      } else {
        setCurrentVote(type);
        if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === 'DOWN')
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  return (
    <div className='flex flex-col w-12 md:w-20 md:gap-4 md:pb-4 mr-1 md:mr-4'>
      <Button
        onClick={() => vote('UP')}
        size='sm'
        variant='ghost'
        aria-label='upvote'
        className='hidden md:inline-flex'
      >
        <ArrowBigUp
          className={cn('h-4 w-4 md:h-5 md:w-5', {
            'text-purple-500 fill-purple-500': currentVote === 'UP',
          })}
        />
      </Button>
      <button
        onClick={() => vote('UP')}
        aria-label='upvote'
        className='py-2 flex justify-center items-center md:hidden'
      >
        <ArrowBigUp
          className={cn('h-4 w-4 md:h-5 md:w-5', {
            'text-purple-500 fill-purple-500': currentVote === 'UP',
          })}
        />
      </button>

      <p className='text-center py-2 font-medium text-sm'>{votesAmt}</p>

      <Button
        onClick={() => vote('DOWN')}
        size='sm'
        variant='ghost'
        aria-label='downvote'
        className='hidden md:inline-flex'
      >
        <ArrowBigDown
          className={cn('h-4 w-4 md:h-5 md:w-5', {
            'text-red-500 fill-red-500': currentVote === 'DOWN',
          })}
        />
      </Button>
      <button
        onClick={() => vote('DOWN')}
        aria-label='upvote'
        className='py-2 flex justify-center items-center md:hidden'
      >
        <ArrowBigDown
          className={cn('h-4 w-4 md:h-5 md:w-5', {
            'text-red-500 fill-red-500': currentVote === 'DOWN',
          })}
        />
      </button>
    </div>
  );
};

export default VoteClient;
