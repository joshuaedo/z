import GeneralFeed from "@/components/feeds/GeneralFeed";
import HomeFeedToggle from "@/components/HomeFeedToggle";

export default function HomePage() {
  return (
    <div className={`relative`}>
      <HomeFeedToggle />
      <div className={`pt-6`}>
      {/* @ts-expect-error server-component */}
        <GeneralFeed />
      </div>
    </div>
  );
}
