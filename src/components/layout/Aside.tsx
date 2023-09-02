import Link from "next/link";
import { Icons } from "../Icons";
import { Home, UserCircle, Search, Users } from "lucide-react";

 const Aside = () => {
    return (
      <aside className="overflow-hidden h-fit w-full rounded-lg border border-gray-200 fixed">
        
        <Link href="/" className="hidden md:flex items-center">
          <Icons.logo className="h-8 w-8 md:h-10 md:w-10" />
        </Link>

        <Link href="/home" className="flex items-center justify-around">
          <Home strokeWidth={1.2} className="h-7 w-7 md:h-9 md:w-9" />
           Home
        </Link>

        <UserCircle strokeWidth={1.2} className="h-7 w-7 md:h-9 md:w-9" />
        <Search strokeWidth={1.2} className="h-7 w-7 md:h-9 md:w-9" />
        <Users strokeWidth={1.2} className="h-7 w-7 md:h-9 md:w-9" />
        

      </aside>
    )
}

export default Aside;