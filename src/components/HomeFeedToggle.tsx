"use client"

import { usePathname } from 'next/navigation';

const HomeFeedToggle = () => {
  const pathname = usePathname();

  return (
       <div className="flex w-full items-center justify-center">
         <div className='overflow-hidden max-w-4xl h-fit flex items-center justify-evenly rounded-lg shadow px-7 py-5 bg-white'>
          <a href="/" className={`py-2 px-3 hover:bg-[#F8FAFC] cursor-pointer mr-4 ${pathname === "/" ? "font-bold" : "opacity-60"}`}>For You</a>
          <a href="/following" className={`py-2 px-3 hover:bg-[#F8FAFC] cursor-pointer ${pathname === "/following" ? "font-bold" : "opacity-60"}`}>Following</a>
        </div>
      </div>
  );
};

export default HomeFeedToggle;
