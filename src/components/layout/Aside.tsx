import Link from "next/link";
import { HomeIcon } from "@radix-ui/react-icons";
import { Icons } from "../Icons";
import { SearchIcon } from "lucide-react";

 const Aside = () => {
    return (
      <aside className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first">
        
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="h-8 w-8 md:h-10 md:w-10" />
        </Link>

        <div className="px-6 py-4">
          <p className="font-semibold py-3 flex items-center gap-1.5">
           <HomeIcon className="w-4 h-4" />
            Home
          </p>
        </div>

        <div className="divide-y divide-gray-100 px-6 py-4">
        <p className="font-semibold py-3 flex items-center gap-1.5">
         <SearchIcon className="w-4 h-4" />
          Explore
          </p>
        </div>


      </aside>
    )
}

export default Aside;