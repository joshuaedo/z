'use client';

import SignInFireWall from '@/components/features/auth/SignInFireWall';
import { Button } from '@/components/ui/Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const RedirectToProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleViewProfile = () => {
    router.push(`/u/${session?.user?.username}`);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-[65svh]'>
      {session ? (
        <Button onClick={handleViewProfile}>View Profile</Button>
      ) : (
        <SignInFireWall />
      )}
    </div>
  );
};

export default RedirectToProfilePage;
