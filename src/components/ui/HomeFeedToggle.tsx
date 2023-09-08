"use client"

import { usePathname, useRouter } from 'next/navigation';

{/* <a href="/" className={`py-2 px-3 hover:bg-[#F8FAFC] cursor-pointer mr-4 ${pathname === "/" ? "font-bold" : "opacity-60"}`}>For You</a>
          <a href="/following" className={`py-2 px-3 hover:bg-[#F8FAFC] cursor-pointer ${pathname === "/following" ? "font-bold" : "opacity-60"}`}>Following</a> */}

const HomeFeedToggle = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
       <div className="flex w-full items-center justify-center">
         <div className='overflow-hidden max-w-4xl h-fit flex items-center justify-evenly rounded-lg shadow px-7 py-5 bg-white'>
          <button onClick={() => router.push('/')} className={`py-2 px-3 hover:bg-[#F8FAFC] cursor-pointer mr-4 ${pathname === "/" ? "font-bold" : "opacity-60"}`}>For You</button>
          <button onClick={() => router.push('/following')} className={`py-2 px-3 hover:bg-[#F8FAFC] cursor-pointer ${pathname === "/following" ? "font-bold" : "opacity-60"}`}>Following</button>
        </div>
      </div>
  );
};

export default HomeFeedToggle;
