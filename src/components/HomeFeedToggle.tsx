import { usePathname, useRouter } from 'next/navigation';

const HomeFeedToggle: FC<HomeFeedToggleProps> = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
         <div className='overflow-hidden h-fit flex justify-between rounded-lg md:shadow md:fixed px-10 py-8 space-y-4 bg-white'>
          <div className={` ${pathname === "/" ? "font-bold" : "opacity-60"}`}>For You</div>
          <div className={` ${pathname === "/following" ? "font-bold" : "opacity-60"}`}>Following</div>
        </div>
  );
};

export default HomeFeedToggle;
