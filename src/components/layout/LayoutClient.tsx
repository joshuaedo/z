'use client';

import { usePathname } from 'next/navigation';
import React, { FC } from 'react';

interface LayoutClientProps {
  children: React.ReactNode;
}

const LayoutClient: FC<LayoutClientProps> = ({ children }) => {
  const pathname = usePathname();
  const isConversationPage = pathname.includes('/messages/u/');

  return (
    <main
      className={`mx-auto max-w-5xl h-full md:pt-8 ${
        !isConversationPage
          ? 'pb-20 md:pb-8 mobile-container md:container pt-20'
          : 'relative'
      } `}
    >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-4'>
        {children}
      </div>
    </main>
  );
};

export default LayoutClient;
