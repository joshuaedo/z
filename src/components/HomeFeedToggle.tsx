"use client"

import { usePathname, useRouter } from 'next/navigation';

const HomeFeedToggle = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
         <div className='overflow-hidden h-fit flex items-center rounded-lg shadow px-10 py-8 bg-white fixed'>
          <div onClick={() => router.push('/')} className={` hover:bg-[#F8FAFC] cursor-pointer mr-4 ${pathname === "/" ? "font-bold" : "opacity-60"}`}>For You</div>
          <div onClick={() => router.push('/following')} className={` hover:bg-[#F8FAFC] cursor-pointer ${pathname === "/following" ? "font-bold" : "opacity-60"}`}>Following</div>
        </div>
  );
};

export default HomeFeedToggle;
