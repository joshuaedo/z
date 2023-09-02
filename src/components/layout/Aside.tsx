import Link from "next/link";
import { Icons } from "../Icons";
import { Home, UserCircle, Search, Users2 } from "lucide-react";

 const Aside = () => {
    return (
      <aside className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first">
        
        <Link href="/" className="hidden md:flex gap-2 items-center">
          <Icons.logo className="h-8 w-8 md:h-10 md:w-10" />
        </Link>

        <div className="px-6 py-4">
          <p className="py-3 flex items-center gap-1.5">
           <Home strokeWidth={1} className="h-7 w-7 md:h-9 md:w-9" />
            <span className={`font-semibold`}>Home</span>
          </p>
        </div>

        <UserCircle strokeWidth={1} className="h-7 w-7 md:h-9 md:w-9" />
        <Search strokeWidth={1} className="h-7 w-7 md:h-9 md:w-9" />
        <Users2 strokeWidth={1} className="h-7 w-7 md:h-9 md:w-9" />
        

      </aside>
    )
}

export default Aside;