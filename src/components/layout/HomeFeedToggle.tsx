'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useSession } from 'next-auth/react';

const HomeFeedToggle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const isUserLoggedIn = session?.user;
  const isHomePage = pathname === '/' || pathname === '/following';

  if (!isHomePage || !isUserLoggedIn) {
    return null;
  }

  return (
    <div className='flex w-full items-center justify-center mb-6'>
      <div className='overflow-hidden max-w-4xl h-fit flex items-center justify-evenly rounded-lg bg-white dark:bg-[#000000] shadow dark:border border-[#333333] px-7 py-5 text-xl'>
        <Button
          variant='ghost'
          onClick={() => router.push('/')}
          className={`${pathname === '/' ? 'font-bold' : 'font-medium'}`}
        >
          For You
        </Button>
        <Button
          variant='ghost'
          onClick={() => router.push('/following')}
          className={`${
            pathname === '/following' ? 'font-bold' : 'font-medium'
          }`}
        >
          Following
        </Button>
      </div>
    </div>
  );
};

export default HomeFeedToggle;
