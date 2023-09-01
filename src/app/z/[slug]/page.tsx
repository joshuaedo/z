import MiniCreatePost from "@/components/MiniCreatePost";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import PostFeed from "@/components/feeds/PostFeed";
import SideBar from "@/components/SideBar";

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
                orderBy: {
                  createdAt: "desc"
                },

                // take: 100
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
     <div className="sm:container max-w-7xl mx-auto h-full pt-4 md:pt-6 lg:pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <div className="flex flex-col col-span-1 md:col-span-2 space-y-6">
            <h1 className="font-bold text-3xl md:text-4xl h-14">z/{community.name}</h1>
            <MiniCreatePost session={session}  />
            <div className="inline md:hidden">
              <SideBar community={community} session={session} isSubscribed={isSubscribed} memberCount={memberCount} />
            </div>
            <PostFeed initialPosts={community.posts} communityName={community.name} />
          </div>
          <div className="hidden md:inline">
            <SideBar community={community} session={session} isSubscribed={isSubscribed} memberCount={memberCount} />
          </div>
        </div>
    </div>
    )
}

export default SubmitPage;