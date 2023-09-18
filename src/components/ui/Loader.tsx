'use client';

import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className='w-full flex p-2 items-center justify-center'>
      <Loader2 className='animate-spin' />
    </div>
  );
};

export default Loader;
