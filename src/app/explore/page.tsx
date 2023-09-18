import TrendingCommunities from "@/components/community/TrendingCommunities";
import ExploreFeed from "@/components/feeds/ExploreFeed";
import SearchBar from "@/components/ui/SearchBar";
import { db } from "@/lib/db";

export const metadata = {
  title: "Explore / Z",
  description: "",
  openGraph: {
    title: "Explore / Z",
    description: "",
    images: [
      {
        url: "",
        width: 200,
        height: 200,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Explore / Z",
    description: "",
    images: [""],
  },
};

interface ExplorePageProps {}

const ExplorePage = async ({}: ExplorePageProps) => {
  const popularCommunities = await db.community.findMany({
    orderBy: {
      subscribers: {
        _count: "desc",
      },
    },
    take: 5, // Limit to the top 5 communities
  });

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-3xl md:text-4xl">Explore</h2>
      <SearchBar />
      <TrendingCommunities popularCommunities={popularCommunities} />
      {/* @ts-expect-error Server Component */}
      <ExploreFeed />
    </div>
  );
};

export default ExplorePage;
