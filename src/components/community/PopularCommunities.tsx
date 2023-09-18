import { Users } from "lucide-react";
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
    <div className="rounded-lg shadow p-8 space-y-2 bg-white">
      <ul id="explore" className="text-zinc-900 space-y-3">
        {popularCommunities.map((community, index) => (
          <li
            key={community.id}
            className="py-1 flex items-center  hover:bg-[#F8FAFC] rounded-lg p-1"
          >
            <h2 className="font-bold text-xl gap-x-4 md:gap-x-5 text-zinc-400">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </h2>
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
        ))}
      </ul>
    </div>
  );
};

export default PopularCommunities;