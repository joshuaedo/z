"use client"

import React, { FC } from 'react';
import { buttonVariants } from '../ui/Button';
import { useRouter } from 'next/navigation';

interface SignInFireWallProps {}

const SignInFireWall: FC<SignInFireWallProps> = ({}) => {
  const router = useRouter();

  return (
    <div>
        <p>Sign in </p>
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
  );
};

export default SignInFireWall;
