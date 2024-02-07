import Aside from './Aside';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/DropDownMenu';
import { getAuthSession } from '@/lib/auth';
import HeaderClient from './HeaderClient';

const Header = async () => {
  const session = await getAuthSession();
  const user = session?.user;

  return (
    <nav className='md:hidden fixed top-0 h-[4rem] bg-zinc-100 dark:bg-[#000000] border-b border-zinc-300 dark:border-[#333333] z-[60] container px-8 flex items-center w-full'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <HeaderClient user={user} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            {/* @ts-expect-error Server Component */}
            <Aside />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Header;
