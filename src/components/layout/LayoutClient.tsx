'use client';

import { usePathname } from 'next/navigation';
import React, { FC } from 'react';
import Aside from '@/components/layout/Aside';
import MobileHeader from '@/components/layout/Header';
import MobileNavbar from '@/components/layout/MobileNav';
import { Toaster } from '@/components/ui/Toaster';
import HomeFeedToggle from '@/components/layout/HomeFeedToggle';
import PageTitle from '@/components/layout/PageTitle';

interface LayoutClientProps {
  children: React.ReactNode;
}

const LayoutClient: FC<LayoutClientProps> = ({ children }) => {
  const pathname = usePathname();
  const isConversationPage = pathname.includes('/messages/u/');

  return (
    <>
      <main
        className={`mx-auto max-w-5xl h-full md:pt-8 ${
          !isConversationPage
            ? 'pb-20 md:pb-8 mobile-container md:container pt-20'
            : 'relative max-h-[100svh]'
        } `}
      >
        <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-4'>
          <div className='hidden md:block col-span-1 h-full relative'>
            <Aside />
          </div>
          <div className='col-span-1 md:col-span-2 relative'>
            <MobileHeader />
            <HomeFeedToggle />
            <PageTitle />
            {children}
            <MobileNavbar />
          </div>
        </div>
      </main>
      <Toaster />
    </>
  );
};

export default LayoutClient;
