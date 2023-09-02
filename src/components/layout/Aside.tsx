import Link from "next/link";
import { Icons } from "../Icons";
import { Home, UserCircle, Search, Users } from "lucide-react";

 const Aside = () => {
    return (
      <aside className="overflow-hidden h-fit rounded-lg border border-gray-200 fixed px-20 py-8 space-y-5">
        
        <Link href="/" className="hidden md:flex items-center">
          <Icons.logo className="h-8 w-8 md:h-10 md:w-10" />
        </Link>

        <Link href="/" className="flex items-center justify-center text-2xl font-medium p-3 rounded-lg">
           <Home strokeWidth={1.2} className="h-6 w-6 md:h-8 md:w-8 mr-2" />
           Home
        </Link>

        <Link href="/" className="flex items-center justify-center text-2xl font-medium p-3 rounded-lg">
           <UserCircle strokeWidth={1.2} className="h-6 w-6 md:h-8 md:w-8 mr-2" />
           Profile
        </Link>

        <Link href="/" className="flex items-center justify-center text-2xl font-medium p-3 rounded-lg">
           <Search strokeWidth={1.2} className="h-6 w-6 md:h-8 md:w-8 mr-2" />
           Explore
        </Link>

        <Link href="/" className="flex items-center justify-center text-2xl font-medium p-3 rounded-lg">
           <Users strokeWidth={1.2} className="h-6 w-6 md:h-8 md:w-8 mr-2" />
           Communities
        </Link>

        
        
        
        

      </aside>
    )
}

export default Aside;