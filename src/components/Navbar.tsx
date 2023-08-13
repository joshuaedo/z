import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
// import { Lato } from "next/font/google";
// const lato = Lato({ weight: "400", subsets: ["latin"] });

const Navbar = async () => {

  const session = await getAuthSession();
  const zUser = session?.user;
  // const zMail = session?.user.email;
  // const zId = session?.user.id;
  // const zImage = session?.user.image;
  // const zName = session?.user.name;
  // const zUsername = session?.user.username;


  return (
    <nav className="fixed top-0 inset-x-0 h-fit bg-zinc-100 bprder-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="h-8 w-8 md:h-10 md:w-10" />
        </Link>

        {/* Search Bar */}
        {zUser ? (<UserAccountNav user={zUser} />) :
          (<Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>)}
      </div>
    </nav>
  );
};

export default Navbar;
