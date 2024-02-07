'use client';

import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className='w-full h-full flex p-2 items-center justify-center'>
      <Loader2 className='animate-spin text-purple-500' />
    </div>
  );
};

export default Loader;
