'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Community } from '@prisma/client';
import { Session } from 'next-auth';

interface CommunitiesProps {
  session: Session | null;
  subs: Community[];
}

const Communities: FC<CommunitiesProps> = ({ session, subs }) => {
  const router = useRouter();
  const zUser = session?.user;

  return (
    <main className='overflow-hidden h-fit rounded-lg md:shadow md:fixed p-8 space-y-2 bg-white'>
      <ul id='community' className='text-zinc-600 max-h-[10rem] space-y-1'>
        {subs.map((community) => (
          <li
            key={community.id}
            onClick={() => router.push(`z/${community.name}`)}
            className='py-1'
          >
            {`z/${community.name}`}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Communities;
