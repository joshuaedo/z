'use client';

import { useMutation } from '@tanstack/react-query';
import { Button } from './ui/Button';
import { SubscribeToCommunityPayload } from '@/lib/validators/community';
import { FC, startTransition } from 'react';
import axios, { AxiosError } from 'axios';
import { useCustomToast } from '@/hooks/use-custom-toast';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { CheckCheck } from 'lucide-react';

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
    <Button
      isLoading={isUnSubscribing}
      onClick={() => unsubscribe()}
      className=''
    >
      {`Joined `}<CheckCheck />
    </Button>
  ) : (
    <Button
      isLoading={isSubscribing}
      onClick={() => subscribe()}
      className=''
    >
      Join
    </Button>
  );
};

export default SubscribeLeaveToggle;
