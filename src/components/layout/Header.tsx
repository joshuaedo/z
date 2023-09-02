import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import { Icons } from "../Icons";
import UserAccountNav from "../UserAccountNav";
import { buttonVariants } from "../ui/Button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const Header = async () => {

  const session = await getAuthSession();
  const zUser = session?.user;

  return (
    <nav className="inline md:hidden fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-center relative">
       
       <Link href="" className="absolute top-2 left-2">
       <HamburgerMenuIcon />
       </Link>

        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="h-8 w-8 md:h-10 md:w-10" />
        </Link>

        {/* Search Bar */}


        {/* {zUser ? (<UserAccountNav user={zUser} />) :
          (<Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>)} */}

      </div>
    </nav>
  );
};

export default Header;
