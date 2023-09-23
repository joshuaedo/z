import Link from 'next/link';
import UserAvatar from '../ui/UserAvatar';
import { getAuthSession } from '@/lib/auth';
import MobileNavClient from './MobileNavClient';

const MobileNav = async () => {
  const session = await getAuthSession();
  const zUser = session?.user;

  return (
    <nav className='inline md:hidden fixed bottom-0 inset-x-0 h-[2rem] bg-zinc-100 :dark:bg-[#000000]  border-b border-zinc-300 dark:border-[#333333] z-[60]'>
      <div className='container h-full flex items-center justify-between px-8 relative'>
        <MobileNavClient />

        <Link
          href={`/u/${zUser?.username}`}
          className='flex items-end text-xl font-medium py-1 pr-2 rounded-lg'
        >
          <UserAvatar
            className='h-6 w-6'
            user={{
              name: zUser?.name || null,
              image: zUser?.image || null,
            }}
          />
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
