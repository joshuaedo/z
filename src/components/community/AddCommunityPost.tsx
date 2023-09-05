'use client';

import { Session } from 'next-auth';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';
import { Button } from '../ui/Button';
import UserAvatar from '../UserAvatar';
import { Textarea } from '../ui/TextArea';

interface AddCommunityPostProps {
  session: Session | null;
}

const AddCommunityPost: FC<AddCommunityPostProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <li className='overflow-hidden rounded-md bg-white shadow list-none'>
        <div className='h-full px-6 py-4 flex justify-between gap-4 md:gap-6'>

          {/* Avatar */}
          <div className='relative'>
            <UserAvatar
              user={{
                name: session?.user.name || null,
                image: session?.user.image || null,
              }}
            />
            <span className='absolute bottom-0 right-0 rounded-full h-3 w-3 bg-green-500 outline outline-2 outline-white' />
          </div>    
        
        {/* Add Post */}
        
          <Button
            variant='ghost'
            onClick={() => router.push(pathname + '/submit')}
            className=''
          >
            <Textarea placeholder="What's happening?" />
          </Button>
             
        </div>
      </li>
    </>
  );
};

export default AddCommunityPost;
