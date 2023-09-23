"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

const HomeFeedToggle = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex w-full items-center justify-center">
      <div className="overflow-hidden max-w-4xl h-fit flex items-center justify-evenly rounded-lg bg-white dark:bg-[#000000] shadow dark:border border-[#333333] px-7 py-5">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className={`${pathname === "/" ? "font-bold" : "font-medium"}`}
        >
          For You
        </Button>
        <Button
          variant="ghost"
          onClick={() => router.push("/following")}
          className={`${pathname === "/" ? "font-bold" : "font-medium"}`}
        >
          Following
        </Button>
      </div>
    </div>
  );
};

export default HomeFeedToggle;
