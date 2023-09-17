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
  const zUser = session?.user;

  return (
    <main className="space-y-6">
      <h2 className="font-bold text-3xl md:text-4xl">Your Communities</h2>
      <div className="rounded-lg shadow p-8 space-y-2 bg-white">
        <button
          onClick={() => router.push("/z/create")}
          className="py-3 pr-4 rounded-lg hover:bg-[#F8FAFC] text-zinc-600 flex items-center gap-x-2.5 md:gap-x-3.5 text-xl"
        >
          <Plus className="" />
          <span>Create a community</span>
        </button>

        <ul id="community" className="text-zinc-900 space-y-3">
          {subs.map((community) => (
            <>
              <hr />
              <li
                key={community.id}
                className="py-1 flex items-center gap-x-4 md:gap-x-5 cursor-pointer hover:bg-[#F8FAFC] rounded-lg p-1"
              >
                <Link href={`z/${community.name}`} className="w-full h-full">
                  <CommunityAvatar
                    community={community}
                    className="h-12 w-12"
                  />
                  <div>
                    <p className="font-medium">
                      {`z/${
                        community.name.length > 16
                          ? community.name.slice(0, 13) + "..."
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
            </>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Communities;
