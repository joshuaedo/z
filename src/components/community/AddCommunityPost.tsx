'use client';

import { Session } from 'next-auth';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';
import UserAvatar from '../UserAvatar';
import { Input } from '../ui/Input';
import { Feather } from 'lucide-react';

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
        <div className='h-full px-4 py-4 flex justify-between'>
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

          <div className='text-sm font-normal opacity-60'>
            What&apos;s happening?
          </div>

          <div
            className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-${
              isCreator ? 'purple' : 'green'
            }-500`}
          >
            <Feather
              onClick={() => router.push(pathname + '/submit')}
              className='w-8 h-8'
              strokeWidth={1.9}
            />
          </div>
        </div>
      </li>
    </>
  );
};

export default AddCommunityPost;
