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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <div className='h-[30vh] md:h-[40vh] flex items-start relative'>
          <div
            className={`w-full h-[75%] rounded-t-md shadow overflow-hidden flex items-center justify-center`}
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
                      <SelectTrigger>
                        <SelectValue placeholder='Select a background colour for your profile.' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='black'>black</SelectItem>
                      <SelectItem value='white'>white</SelectItem>
                      <SelectItem value='purple-500'>purple</SelectItem>
                      <SelectItem value='blue-500'>blue</SelectItem>
                      <SelectItem value='pink-500'>pink</SelectItem>
                      <SelectItem value='green-500'>green</SelectItem>
                      <SelectItem value='gray-500'>gray</SelectItem>
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
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
