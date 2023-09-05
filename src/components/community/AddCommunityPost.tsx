'use client';

import { Session } from 'next-auth';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';
import UserAvatar from '../UserAvatar';
import { Input } from '../ui/Input';

interface AddCommunityPostProps {
  session: Session | null;
  isCreator: boolean;
}

const AddCommunityPost: FC<AddCommunityPostProps> = ({
  session,
  isCreator,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <li className='overflow-hidden rounded-md bg-white shadow list-none'>
        <div className='h-full px-5 py-4 flex justify-between gap-4 md:gap-6'>
          {/* Avatar */}
          <div className='relative'>
            <UserAvatar
              user={{
                name: session?.user.name || null,
                image: session?.user.image || null,
              }}
            />
            <span
              className={`absolute bottom-0 right-0 rounded-full h-3 w-3 bg-${
                isCreator ? 'purple' : 'green'
              }-500 outline outline-2 outline-white`}
            />
          </div>

          {/* Add Post */}

          <Input
            className='no-focusing focus:ring-0 border-0 outline-none shadow-none placeholder:text-sm placeholder:font-medium px-0 pb-2'
            onClick={() => router.push(pathname + '/submit')}
            placeholder="What's happening?"
          />
        </div>
      </li>
    </>
  );
};

export default AddCommunityPost;
