import { buttonVariants } from "@/components/ui/Button"
import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Feather } from "lucide-react";

const Layout = async ({children, params: {slug},}: {children: React.ReactNode; params: {slug: string}}) => {

const session = await getAuthSession();

const community = await db.community.findFirst({
  where: { name: slug },
  include: {
    posts: {
      include: {
          author: true,
          votes: true,
      }
    }
  }
})

const subscription = !session?.user ? undefined : await db.subscription.findFirst({
  where: {
    community: {
      name: slug,
    },
    user: {
      id: session.user.id
    }
  }
})

const isSubscribed = !!subscription;

if(!community) return notFound();

const memberCount = await db.subscription.count({
  where: {
    community: {
      name: slug,
    }
  }
})

return (
  <div className="sm:container max-w-7xl mx-auto h-full pt-12">
    <div>
        {/* <Button>Back</Button> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        <div className="flex flex-col col-span-1 md:col-span-2 space-y-6">{children}</div>

        {/* Info sidebar */}
        <div className="col-span-1 overflow-hidden h-fit rounded-lg border border-gray-200 order-last">
            <div className="px-6 py-4">
              <p className="font-semi-bold py-3">
                About z/{community.name}
              </p>
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
              ): null}

            {community.creatorId !== session?.user.id ? (
             <SubscribeLeaveToggle isSubscribed={isSubscribed} communityId={community.id} communityName={community.name} />
              ): null}
            </dl>

            <div className="hidden md:flex justify-center items-center">
              <Link href={`z/${slug}/submit`} className={buttonVariants({
               variant: "link",
               className: "w-[90%]",
               })}>
              What&apos;s happening?
             </Link>
           </div>

          <Link href={`z/${slug}/submit`} className={buttonVariants({
            variant: "default",
            className: "md:hidden z-10 fixed bottom-10 right-10 rounded-[50%] text-white",
          })}>
           <Feather />
          </Link>
          
        </div>
      </div>
    </div>
  </div>
  )
}

export default Layout