import CustomFeed from "@/components/feeds/CustomFeed";
import GeneralFeed from "@/components/feeds/GeneralFeed";
import { getAuthSession } from "@/lib/auth";

export default async function HomePage() {

   const session = await getAuthSession()

  return (
      <>
      {/* @ts-expect-error server-component */}
     {session ? <CustomFeed /> : <GeneralFeed />}
     </>
  )
}
