"use client";

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CreateCommunityPayload } from '@/lib/validators/community';

interface pageProps {

}

const Create: FC<pageProps> = ({ }) => {
  const [input, setInput] = useState<string>('');
  const router = useRouter();

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateCommunityPayload = {
        name: input
      };

      const { data } = await axios.post("/api/community", payload);
      return data as string;
    }
  });

  return (
    <div className='container flex items-center h-full max-w-3xl mx-auto'>
      <div className='relative bg-white w-full h-fit rounded-lg p-4 space-y-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-semibold'>Create a community</h1>

          <hr className='bg-zinc-500 h-px' />

        </div>

        <div>
          <p className="text-lg font-medium">Name</p>
          <p className="text-xs pb-2">Community names including capitalization cannot be changed.</p>
        </div>

        <div className="relative">
          <p className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400'>z/</p>

          <Input value={input} onChange={(e) => setInput(e.target.value)} className='pl-6' />
        </div>

        <div className='flex justify-end gap-4'>
          <Button variant="subtle" onClick={() => router.back()}>Cancel</Button>
          <Button isLoading={isLoading} disabled={input.length === 0}
            onClick={() => createCommunity()}
          >Create Community</Button>
        </div>

      </div>
    </div>
  );
};

export default Create;