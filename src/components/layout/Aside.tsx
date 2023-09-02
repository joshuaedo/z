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
      <aside className="overflow-hidden h-fit rounded-lg border border-gray-200 fixed px-10 py-8 space-y-2">
        
        <Link href="/" className="hidden md:flex items-center">
          <Icons.logo className="h-8 w-8 md:h-10 md:w-10" />
        </Link>

        <Link href="/" className="flex items-center text-2xl font-medium py-1 pr-2 rounded-lg">
           <Home strokeWidth={1.2} className="h-6 w-6 md:h-8 md:w-8 mr-2" />
           Home
        </Link>

        <Link href="/profile" className="flex items-center text-2xl font-medium py-1 pr-2 rounded-lg">
           <UserCircle strokeWidth={1.2} className="h-6 w-6 md:h-8 md:w-8 mr-2" />
           Profile
        </Link>

        <Link href="/explore" className="flex items-center text-2xl font-medium py-1 pr-2 rounded-lg">
           <Search strokeWidth={1.2} className="h-6 w-6 md:h-8 md:w-8 mr-2" />
           Explore
        </Link>

        <Link href="/communities" className="flex items-center text-2xl font-medium py-1 pr-2 rounded-lg">
           <Users strokeWidth={1.2} className="h-6 w-6 md:h-8 md:w-8 mr-2" />
           Communities
        </Link>

       <hr />
        
        {zUser ? (<UserAccountNav user={zUser} />) :
          (<Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>)}

       <hr />

       <div>
       <Link href="/privacy-policy" className="text-lg font-medium py-1 pr-2 rounded-lg">
           Privacy Policy
        </Link>
        <Link href="/terms-of-service" className="text-lg font-medium py-1 pr-2 rounded-lg">
           Terms of Service
        </Link>
        <Link href="/" className="text-lg font-medium py-1 pr-2 rounded-lg">
           Support
        </Link>
       </div>
        
      </aside>
    )
}

export default Aside;