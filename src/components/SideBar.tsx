import {FC} from "react";
import { format } from "date-fns";
import SubscribeLeaveToggle from "./SubscribeLeaveToggle";
import { Session } from "next-auth";

interface SideBarProps{
community: {
  id: string,
  name: string,
  createdAt: Date;
  creatorId: string | null,
},
session: Session | null,
isSubscribed: boolean,
memberCount: number,
}

const SideBar: FC<SideBarProps> = ({community, session, isSubscribed, memberCount}) => {

    return (
         <div className="col-span-1 overflow-hidden h-fit rounded-lg border border-gray-200">
            <div className="px-6 py-4">
              <p className="font-semi-bold py-3">About z/{community.name}</p>
            </div>
            <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Created</dt>
                <dd className="text-gray-700">
                  <time dateTime={community.createdAt.toDateString()}>
                    {format(community.createdAt, "MMMM d, yyyy")}
                  </time>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Members</dt>
                <dd className="text-gray-700">
                  <div className="text-gray-900">{memberCount}</div>
                </dd>
              </div>
              {community.creatorId === session?.user.id ? (
                <div className="flex justify-between gap-x-4 py-3">
                  <p className="text-gray-500">You created this community</p>
                </div>
              ) : null}
              {community.creatorId !== session?.user.id ? (
                <SubscribeLeaveToggle
                  isSubscribed={isSubscribed}
                  communityId={community.id}
                  communityName={community.name}
                />
              ) : null}
            </dl>
          </div>
    )
} 

export default SideBar;