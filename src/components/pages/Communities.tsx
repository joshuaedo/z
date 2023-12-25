"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { Community } from "@prisma/client";
import { Session } from "next-auth";
import CommunityAvatar from "../community/CommunityAvatar";
import { Plus, Users } from "lucide-react";
import Link from "next/link";

type ExtendedCommunity = Community & {
  _count?: {
    subscribers: number;
  };
};

interface CommunitiesProps {
  session: Session | null;
  subs: ExtendedCommunity[];
}

const Communities: FC<CommunitiesProps> = ({ session, subs }) => {
  const router = useRouter();

  return (
    <main className="space-y-6">
      <h2 className="font-bold text-3xl md:text-4xl">Your Communities</h2>
      <div className="rounded-lg bg-white dark:bg-[#000000] shadow dark:border border-[#333333] px-8 pb-8 pt-4 space-y-2 ">
        <button
          onClick={() => router.push("/z/create")}
          className="py-3 pr-4 rounded-lg text-muted-foreground flex items-center gap-x-2.5 md:gap-x-3.5 text-base md:text-xl"
        >
          <Plus />
          <span>Create a community</span>
        </button>
        <ul id="community" className=" space-y-3">
          {subs.map((community) => (
            <div key={community.id}>
              <hr />
              <li className="py-1 flex items-center rounded-lg p-1">
                <Link
                  href={`z/${community.name}`}
                  className="w-full h-full flex items-center gap-x-4 md:gap-x-5"
                >
                  <CommunityAvatar
                    community={community}
                    className="h-12 w-12"
                  />
                  <div>
                    <p className="hidden md:block font-medium">
                      {`z/${
                        community.name.length > 16
                          ? community.name.slice(0, 15) + "..."
                          : community.name
                      }`}
                    </p>
                    <p className="md:hidden font-medium">
                      {`z/${
                        community.name.length > 11
                          ? community.name.slice(0, 10) + "..."
                          : community.name
                      }`}
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
      {subs.length < 3 && (
        <li className="w-full text-xs py-3 flex items-center justify-center">
          <span>- communities you create/join show up here -</span>
        </li>
      )}
    </main>
  );
};

export default Communities;
