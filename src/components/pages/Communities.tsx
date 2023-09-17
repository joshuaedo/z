"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { Community } from "@prisma/client";
import { Session } from "next-auth";
import CommunityAvatar from "../community/CommunityAvatar";
import { Plus } from "lucide-react";

interface CommunitiesProps {
  session: Session | null;
  subs: Community[];
}

const Communities: FC<CommunitiesProps> = ({ session, subs }) => {
  const router = useRouter();
  const zUser = session?.user;

  return (
    <main className="space-y-6">
      <h2 className="font-bold text-3xl md:text-4xl">Your Communities</h2>
      <button
        onClick={() => router.push("/z/create")}
        className="text-zinc-600 flex text-xl"
      >
        <Plus className="gap-x-2 md:gap-x-3" />
        <span>Create a community</span>
      </button>

      <div className="rounded-lg shadow p-8 space-y-2 bg-white">
        <ul id="community" className="text-zinc-900 space-y-1">
          {subs.map((community) => (
            <li
              key={community.id}
              onClick={() => router.push(`z/${community.name}`)}
              className="py-1 flex gap-x-3 cursor-pointer"
            >
              <CommunityAvatar community={community} className="h-7 w-7" />
              {`z/${community.name}`}
              {community._count.subscribers}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Communities;
