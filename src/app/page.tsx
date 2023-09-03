import GeneralFeed from "@/components/feeds/GeneralFeed";
import HomeFeedToggle from "@/components/HomeFeedToggle";
import { getAuthSession } from "@/lib/auth";

export default async function HomePage() {

  const session = await getAuthSession()

  return (
      <div className={`relative`}>
      { session && <HomeFeedToggle /> }
      <div className={`${session && "pt-28"}`}>
               {/* @ts-expect-error server-component */}
               <GeneralFeed />
             </div> 
     </div>
  )
}
