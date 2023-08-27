import MiniCreatePost from "@/components/MiniCreatePost";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
import { format } from "date-fns";

interface SubmitPageProps {
    params: {
        slug: string;
    };
}

const SubmitPage = async ({ params }: SubmitPageProps) => {
    const { slug } = params;

    const session = await getAuthSession();

    const community = await db.community.findFirst({
        where: { name: slug },
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true,
                    comments: true,
                    community: true,
                },

                take: INFINITE_SCROLLING_PAGINATION_RESULTS
            }
        }

    });

    if (!community) {
        return notFound();
    }

    const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          community: {
            name: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubscribed = !!subscription;

  const memberCount = await db.subscription.count({
    where: {
      community: {
        name: slug,
      },
    },
  });

    return (
     <div className="sm:container max-w-7xl mx-auto h-full pt-12">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <div className="flex flex-col col-span-1 md:col-span-2 space-y-6">
          <h1 className="font-bold text-3xl md:text-4xl h-14">z/{community.name}</h1>
            <MiniCreatePost session={session}  />
          </div>

          {/* Info sidebar */}
          <div className="col-span-1 overflow-hidden h-fit rounded-lg border border-gray-200 order-last">
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
        </div>
      </div>
    </div>
    )
}

export default SubmitPage;