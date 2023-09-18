import { TrendingUp, Users } from "lucide-react";
import { FC } from "react";
import CommunityAvatar from "./CommunityAvatar";
import Link from "next/link";
import { Community } from "@prisma/client";

type ExtendedCommunity = Community & {
  _count?: {
    subscribers: number;
  };
};

interface PopularCommunitiesProps {
  popularCommunities: ExtendedCommunity[];
}

const PopularCommunities: FC<PopularCommunitiesProps> = ({
  popularCommunities,
}) => {
  return (
    <div className="rounded-lg shadow px-8 pb-8 pt-4 space-y-2 bg-white">
      <div className="py-3 pr-4 rounded-lg text-zinc-900 flex items-center gap-x-2.5 md:gap-x-3.5 text-sm font-semibold">
        <TrendingUp />
        <span>POPULAR ON Z</span>
      </div>
      <ul id="explore" className="text-zinc-900 space-y-3">
        {popularCommunities.map((community) => (
          <>
            <hr />
            <li
              key={community.id}
              className="py-1 flex items-center hover:bg-[#F8FAFC] rounded-lg p-1"
            >
              <Link
                href={`z/${community.name}`}
                className="w-full h-full flex items-center gap-x-4 md:gap-x-5"
              >
                <CommunityAvatar community={community} className="h-12 w-12" />
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
  );
};

export default PopularCommunities;
