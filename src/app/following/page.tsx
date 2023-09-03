import FollowingFeed from "@/components/feeds/FollowingFeed";
import SignIn from "@/components/feeds/SignIn";
import HomeFeedToggle from "@/components/HomeFeedToggle";
import { getAuthSession } from "@/lib/auth";

export default async function HomePage() {

   const session = await getAuthSession()

  return (
      <>
      {/* @ts-expect-error server-component */}
     {session ? (
           <>
             <HomeFeedToggle />
             <FollowingFeed />
          </>
         )
             : 
             (
                <SignIn />
             )
        }
     </>
  )
}
