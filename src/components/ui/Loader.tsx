'use client';

import { Loader2 } from 'lucide-react';
interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return (
    <div
      className={`${className} w-full h-full flex p-2 items-center justify-center`}
    >
      <Loader2 className='animate-spin text-purple-500' />
    </div>
  );
};

export default Loader;
