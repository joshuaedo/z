'use client';

import React, { FC } from 'react';
import { buttonVariants } from '../ui/Button';
import { useRouter } from 'next/navigation';
import { Icons } from '../ui/Icons';

interface SignInFireWallProps {}

const SignInFireWall: FC<SignInFireWallProps> = ({}) => {
  const router = useRouter();

  return (
    <div className='rounded-md bg-white shadow pr-4 md:px-6 py-4  flex justify-center items-center'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Sign in to{" "}<Icons.logo className='h-7 w-7' />
        </h1>
        <button
          onClick={() => router.push('/sign-in')}
          className={buttonVariants({
            variant: 'default',
            size: 'lg',
          })}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignInFireWall;
