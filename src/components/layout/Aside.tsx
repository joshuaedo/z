import Link from "next/link";
import { Icons } from "../Icons";
import { Home, UserCircle, Search, Users } from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "../UserAccountNav";
import { buttonVariants } from "../ui/Button";

 const Aside = async () => {
    const session = await getAuthSession();
    const zUser = session?.user;

    return (
      <aside className="overflow-hidden h-fit rounded-lg border border-gray-200 fixed px-10 py-8 space-y-4">
        
        <Link href="/" className="hidden md:flex items-center">
          <Icons.logo className="h-8 w-8 md:h-10 md:w-10" />
        </Link>

        <Link href="/" className="flex items-end text-xl font-medium py-1 pr-2 rounded-lg">
           <Home strokeWidth={1.5} className="h-5 w-5 md:h-7 md:w-7 mr-3" />
           Home
        </Link>

        <Link href="/profile" className="flex items-end text-xl font-medium py-1 pr-2 rounded-lg">
           <UserCircle strokeWidth={1.5} className="h-5 w-5 md:h-7 md:w-7 mr-3" />
           Profile
        </Link>

        <Link href="/explore" className="flex items-end text-xl font-medium py-1 pr-2 rounded-lg">
           <Search strokeWidth={1.5} className="h-5 w-5 md:h-7 md:w-7 mr-3" />
           Explore
        </Link>

        <Link href="/communities" className="flex items-end text-xl font-medium py-1 pr-2 rounded-lg">
           <Users strokeWidth={1.5} className="h-5 w-5 md:h-7 md:w-7 mr-3" />
           Communities
        </Link>

       <hr />
        
        {zUser ? (<UserAccountNav user={zUser} />) :
          (<Link href="/sign-in" className={ buttonVariants({
            variant: "default",
            size: "lg",
          })}>
            Sign In
          </Link>)}

       <hr />

       <div className="space-y-1">
       <Link href="/privacy-policy" className="block text-xs font-medium rounded-lg">
           Privacy Policy
        </Link>
        <Link href="/terms-of-service" className="block text-xs font-medium rounded-lg">
           Terms of Service
        </Link>
        <Link href="/support" className="block text-xs font-medium rounded-lg">
           Support
        </Link>
       </div>
        
      </aside>
    )
}

export default Aside;