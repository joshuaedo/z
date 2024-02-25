'use client';

import { formatPathname } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const PageTitle = () => {
  const [pageHeader, setPageHeader] = useState<string | null>('');
  const pathname = usePathname();

  const formattedPathname = formatPathname(pathname);

  useEffect(() => {
    switch (true) {
      case pathname.startsWith('/z/') ||
        pathname.startsWith('/sign') ||
        pathname.includes('/u/') ||
        pathname === '/following' ||
        pathname === '/':
        setPageHeader(null);
        break;
      default:
        setPageHeader(formattedPathname);
        break;
    }
  }, [pathname, formattedPathname]);

  return (
    <header className='font-bold text-2xl md:text-4xl pb-3'>
      {pageHeader}
    </header>
  );
};

export default PageTitle;
