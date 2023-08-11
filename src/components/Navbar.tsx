import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";
// import { Lato } from "next/font/google";
// const lato = Lato({ weight: "400", subsets: ["latin"] });

const Navbar = () => {
  return (
    <nav className="fixed top-0 inset-x-0 h-fit bg-zinc-100 bprder-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="h-8 w-8 md:h-10 md:w-10" />
        </Link>

        {/* Search Bar */}

        <Link href="/sign-in" className={buttonVariants()}>
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
