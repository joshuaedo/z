import Link from 'next/link';
import { Icons } from '../Icons';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/DropDownMenu';
import Aside from './Aside';

const Header = () => {
  return (
    <nav className='inline md:hidden fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-4'>
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-center relative'>
        <div className='absolute top-2 left-8 bg-transparent'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <HamburgerMenuIcon strokeWidth={1.7} className='h-6 w-6' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                {/* @ts-expect-error Server Component */}
                <Aside />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link href='/' className='flex gap-2 items-center'>
          <Icons.logo className='h-8 w-8' />
        </Link>

        {/* Search Bar */}
      </div>
    </nav>
  );
};

export default Header;
