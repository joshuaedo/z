'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { toast } from '@/hooks/use-toast';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCustomToast } from '@/hooks/use-custom-toast';
import { DropZone } from '../../ui/UploadImage';
import { startTransition } from 'react';
import { CommunityValidator } from '@/validators/community';

export default function CreateCommunityForm() {
  const router = useRouter();
  const { loginToast } = useCustomToast();

  const form = useForm<z.infer<typeof CommunityValidator>>({
    resolver: zodResolver(CommunityValidator),
    defaultValues: {
      description: '',
      image: '',
    },
  });

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: async (payload: z.infer<typeof CommunityValidator>) => {
      const { data } = await axios.post('/api/community', payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Community already exists',
            description: 'Please choose a different community.',
            variant: 'destructive',
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid community name',
            description: 'Please choose a name between 3 and 21 characters.',
            variant: 'destructive',
          });
        }

        if (err.response?.status === 412) {
          return toast({
            title: 'Invalid community name',
            description: 'Community name is restricted.',
            variant: 'destructive',
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      toast({
        title: 'Action failed',
        description: 'There was an error creating your community.',
        variant: 'destructive',
      });
    },
    onSuccess: (data) => {
      toast({
        description: 'Your community has been created successfully.',
      });
      startTransition(() => {
        router.push(`/z/${data}`);
        router.refresh();
      });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((e) => updateProfile(e))}
        className='space-y-5'
      >
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Community Photo</FormLabel>
              <FormControl>
                <DropZone {...field} />
              </FormControl>
              <FormDescription>1:1 is recommended</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='What is your community called?'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder='What is your community about?' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end gap-4'>
          <Button isLoading={isLoading} type='submit'>
            Submit
          </Button>
          <Button variant='outline' onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
