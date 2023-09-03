import FollowingFeed from "@/components/feeds/FollowingFeed";
import SignIn from "@/components/SignIn";
import HomeFeedToggle from "@/components/HomeFeedToggle";
import { getAuthSession } from "@/lib/auth";

export default async function HomePage() {

   const session = await getAuthSession()

  return (
   <div className={`relative ${session && "pt-28"}`}>
     {session ? (
           <>
             <HomeFeedToggle />
             {/* @ts-expect-error server-component */}
             <FollowingFeed />
          </>
         )
             : 
             (
                <SignIn />
             )
        }
     </div>
  )
}
