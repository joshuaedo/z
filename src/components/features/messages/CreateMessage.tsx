'use client';
import React, { FC, startTransition, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';
import { useCustomToast } from '@/hooks/use-custom-toast';
import { usePathname, useRouter } from 'next/navigation';
import { SendIcon } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { MessageValidator } from '@/validators/message';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/Form';
import { UploadImageButton } from '@/components/ui/UploadImage';
import { buttonVariants } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/TextArea';
import { cn } from '@/lib/utils';

interface CreateMessageProps {
  authorId: string | undefined;
}

const CreateMessage: FC<CreateMessageProps> = ({ authorId }) => {
  const [input, setInput] = useState<string>('');
  const { loginToast } = useCustomToast();
  const router = useRouter();
  const pathname = usePathname();
  const recieverUsername = pathname.replace('/messages/u/', '');

  const form = useForm<z.infer<typeof MessageValidator>>({
    resolver: zodResolver(MessageValidator),
    defaultValues: {
      authorId,
      recieverUsername,
      image: '',
      text: input,
    },
  });

  const { mutate: sendMessage } = useMutation({
    mutationFn: async (payload: z.infer<typeof MessageValidator>) => {
      const { data } = await axios.patch(`/api/messages`, payload);
      return data;
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
        setInput('');
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((e) => sendMessage(e))}>
        <div className='flex items-center w-full px-3 border rounded-xl mt-2 bg-white text-black'>
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <UploadImageButton {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='text'
            render={({ field }) => (
              <FormItem className='flex flex-grow items-stretch'>
                <FormControl>
                  <Textarea
                    id='message'
                    {...field}
                    rows={1}
                    placeholder='Say something.'
                    className='border-0 rounded-none shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none pr-0 pt-4 pb-3'
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {authorId && (
            <button
              type='submit'
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                  size: 'icon',
                }),
                'cursor-pointer text-black dark:text-black dark:bg-transparent dark:hover:bg-zinc-200'
              )}
            >
              <SendIcon />
            </button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default CreateMessage;
