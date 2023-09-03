import FollowingFeed from "@/components/feeds/FollowingFeed";
import SignIn from "@/components/SignIn";
import HomeFeedToggle from "@/components/HomeFeedToggle";
import { getAuthSession } from "@/lib/auth";

export default async function HomePage() {

   const session = await getAuthSession()

  return (
   <div className={`relative`}>
     {session ? (
           <>
             <HomeFeedToggle />
             <div className={`${session && "pt-6"}`}>
               {/* @ts-expect-error server-component */}
               <FollowingFeed />
             </div>
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
