'use client';

import { useMutation } from '@tanstack/react-query';
import { SubscribeToCommunityPayload } from '@/validators/community';
import { FC, startTransition } from 'react';
import axios, { AxiosError } from 'axios';
import { useCustomToast } from '@/hooks/use-custom-toast';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';

interface SubscribeLeaveToggleProps {
  communityId: string;
  isSubscribed: boolean;
  communityName: string;
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  communityId,
  isSubscribed,
  communityName,
}) => {
  const { loginToast } = useCustomToast();
  const router = useRouter();

  const { mutate: subscribe, isLoading: isSubscribing } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToCommunityPayload = {
        communityId,
      };

      const { data } = await axios.post('/api/community/subscribe', payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: 'Action failed',
        description: 'Something went wrong, please try again later',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      return toast({
        title: 'Subscribed',
        description: `You are now subscribed to z/${communityName}`,
      });
    },
  });

  const { mutate: unsubscribe, isLoading: isUnSubscribing } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToCommunityPayload = {
        communityId,
      };

      const { data } = await axios.post('/api/community/unsubscribe', payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: 'Action failed',
        description: 'Something went wrong, please try again later',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      return toast({
        title: 'Unsubscribed',
        description: `You are now subscribed from z/${communityName}`,
      });
    },
  });

  return isSubscribed ? (
    <div className='flex items-center'>
      <div className='bg-green-500 rounded-full font-semibold py-1 px-2 border border-zinc-900 mx-2'>
        Member
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <LogOut className='w-4 h-4' />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leaving?</AlertDialogTitle>
            <AlertDialogDescription>
              {`This will permanently unsubscribe you from z/${communityName}.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <Button
                className='w-full'
                isLoading={isUnSubscribing}
                onClick={() => unsubscribe()}
              >
                Continue
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ) : (
    <Button
      isLoading={isSubscribing}
      onClick={() => subscribe()}
      className='mx-2'
    >
      Join
    </Button>
  );
};

export default SubscribeLeaveToggle;
