import GeneralFeed from "@/components/feeds/GeneralFeed";
import HomeFeedToggle from "@/components/HomeFeedToggle";
import { getAuthSession } from "@/lib/auth";

export default async function HomePage() {

  return (
      <>
      { session && <HomeFeedToggle /> }
      {/* @ts-expect-error server-component */}
      <GeneralFeed />  
     </>
  )
}
