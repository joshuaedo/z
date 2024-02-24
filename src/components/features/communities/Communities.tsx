"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { Community } from "@prisma/client";
import CommunityAvatar from "./CommunityAvatar";
import { Plus, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

type ExtendedCommunity = Community & {
  _count?: {
    subscribers: number;
  };
};

interface CommunitiesProps {
  subs: ExtendedCommunity[];
}

const Communities: FC<CommunitiesProps> = ({ subs }) => {
  const router = useRouter();

  return (
    <main className="space-y-6">
      <div className="rounded-lg bg-white dark:bg-[#000000] shadow dark:border border-[#333333] px-8 pb-8 pt-4 space-y-2 ">
        <button
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
            "px-3 w-full h-full flex items-center gap-x-4 md:gap-x-5 font-normal cursor-pointer justify-start",
          )}
          onClick={() => router.push("/z/create")}
        >
          <Plus />
          <span>Create a community</span>
        </button>
        <ul id="community" className="space-y-1">
          {subs.map((community) => (
            <div key={community.id}>
              <hr className="mb-1" />
              <li className="py-1 flex items-center rounded-lg p-1">
                <Link
                  href={`z/${community.name}`}
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "px-3 w-full h-full flex items-center gap-x-4 md:gap-x-5 font-normal cursor-pointer justify-start",
                  )}
                >
                  <CommunityAvatar
                    community={community}
                    className="h-12 w-12"
                  />
                  <div className="w-full overflow-x-hidden">
                    <p className="truncate-w-bg max-w-[80%] font-medium">
                      {`z/${community.name}`}
                    </p>

                    <div className="flex items-center pt-2">
                      <Users className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        <span>{`${community._count?.subscribers ?? 0} member${
                          community._count?.subscribers === 1 ? "" : "s"
                        }`}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <li className="w-full text-xs py-3 flex items-center justify-center">
        <span>- communities you create/join show up here -</span>
      </li>
    </main>
  );
};

export default Communities;
