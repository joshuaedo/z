'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Community } from '@prisma/client';
import { Session } from 'next-auth';
import CommunityAvatar from '../ui/CommunityAvatar';

interface CommunitiesProps {
  session: Session | null;
  subs: Community[];
}

const Communities: FC<CommunitiesProps> = ({ session, subs }) => {
  const router = useRouter();
  const zUser = session?.user;

  return (
    <main className='rounded-lg shadow p-8 space-y-2 bg-white'>
      <ul id='community' className='text-zinc-900 space-y-1'>
        {subs.map((community) => (
          <li
            key={community.id}
            onClick={() => router.push(`z/${community.name}`)}
            className='py-1'
          >
            <CommunityAvatar community={community} />
            {`z/${community.name}`}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Communities;
