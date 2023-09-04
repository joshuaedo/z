import ForYouFeed from "@/components/feeds/ForYouFeed";
import GeneralFeed from "@/components/feeds/GeneralFeed";
import HomeFeedToggle from "@/components/HomeFeedToggle";
import { getAuthSession } from "@/lib/auth";

export default async function HomePage() {

  const session = await getAuthSession()

  return (
    <>
      <div className="relative">
        { session ? 
              (
              <>
              <HomeFeedToggle /> 
              <div className="pt-6"> 
                    {/* @ts-expect-error */}
                    <ForYouFeed />
              </div>
               </>
               ) : (
                // @ts-expect-error
               <GeneralFeed />
               )
        }  
     </div>
     </>
  )
}
