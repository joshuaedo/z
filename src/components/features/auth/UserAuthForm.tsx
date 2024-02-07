'use client';

import React, { FC, useState } from 'react';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/ui/Icons';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      // throw new Error();
      await signIn('google');
    } catch (error) {
      // error toast notification
      toast({
        title: 'Error',
        description: 'There was a problem logging in with Google',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button
        size='sm'
        className='w-full'
        onClick={loginWithGoogle}
        isLoading={isLoading}
      >
        {!isLoading && <Icons.google className='h-4 w-4 mr-2' />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
