'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { toast } from '@/hooks/use-toast';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import UserAvatar from '../ui/UserAvatar';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  //  image: z.string(),
  profileTheme: z.string(),
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(50),
  displayName: z.string().max(50),
  bio: z.string().max(160),
  link: z.string().max(100),
  birthday: z.string().max(50),
});

export default function EditProfileForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: async (payload: z.infer<typeof FormSchema>) => {
      const { data } = await axios.patch(`/api/profile/`, payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Username already taken.',
            description: 'Please choose another username.',
            variant: 'destructive',
          });
        }
      }

      return toast({
        title: 'Something went wrong.',
        description: 'Your profile was not updated. Please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      toast({
        description: 'Your profile has been updated.',
      });
      router.refresh();
    },
  });

  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   toast({
  //     title: 'You submitted the following values:',
  //     description: (
  //       <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
  //         <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   });
  // }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit((e) => updateProfile(e))}
        className='space-y-5'
      >
        <div className='h-[30vh] md:h-[40vh] flex items-start relative'>
          <div
            className={`w-full h-[75%] rounded-t-md shadow overflow-hidden flex items-center justify-center px-3`}
          >
            <FormField
              control={form.control}
              name='profileTheme'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Theme</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='text-xs md:text-sm'>
                        <SelectValue placeholder='Select a background colour for your profile.' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='white'>white (default)</SelectItem>
                      <SelectItem value='zinc-900'>black</SelectItem>
                      <SelectItem value='purple-500'>purple</SelectItem>
                      <SelectItem value='green-500'>green</SelectItem>
                      <SelectItem value='zinc-500'>gray</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='h-[15vh] md:h-[17vh] w-full absolute z-2 bottom-0 flex items-center px-3 md:px-5 justify-between '>
            <div className='h-[12vh] md:h-[17vh] w-[12vh] md:w-[17vh] rounded-[50%]'>
              <UserAvatar
                user={{
                  name: null,
                  image: null,
                }}
                className='w-full h-full object-contain'
              />
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Choose a unique username.' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='displayName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder='Any nicknames?' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input placeholder='Tell us about yourself.' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='link'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder='Website?' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='birthday'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birthday</FormLabel>
              <FormControl>
                <Input placeholder='E.g November 28' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={isLoading} type='submit'>
          Submit
        </Button>
      </form>
    </Form>
  );
}
