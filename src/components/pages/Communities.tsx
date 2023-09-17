"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { Community } from "@prisma/client";
import { Session } from "next-auth";
import CommunityAvatar from "../community/CommunityAvatar";
import { Plus, Users } from "lucide-react";

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
      <div className="rounded-lg shadow p-8 space-y-5 bg-white">
        <button
          onClick={() => router.push("/z/create")}
          className="text-zinc-600 flex items-center gap-x-2 md:gap-x-3 text-xl"
        >
          <Plus className="" />
          <span>Create a community</span>
        </button>

        <ul id="community" className="text-zinc-900 space-y-1">
          {subs.map((community) => (
            <li
              key={community.id}
              onClick={() => router.push(`z/${community.name}`)}
              className="py-1 flex gap-x-3 cursor-pointer"
            >
              <CommunityAvatar community={community} className="h-16 w-16" />
              <div>
                <p>
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
                      community._count?.subscribers ?? 0 > 1 ? "s" : ""
                    }`}</span>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Communities;
