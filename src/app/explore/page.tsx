import PopularCommunities from "@/components/community/PopularCommunities";
import SearchBar from "@/components/ui/SearchBar";
import { db } from "@/lib/db";
import { Layers, TrendingUp } from "lucide-react";
import ExploreFeed from '@/components/feeds/explore/ExploreFeed';

export const metadata = {
  title: "Explore / Z",
  description: "Discover and explore the latest trends and communities on Z. Join discussions, share your interests, and connect with like-minded people.",
  openGraph: {
    title: "Explore / Z",
    description: "Discover and explore the latest trends and communities on Z. Join discussions, share your interests, and connect with like-minded people.",
  },
  twitter: {
    card: "summary",
    title: "Explore / Z",
    description: "Discover and explore the latest trends and communities on Z. Join discussions, share your interests, and connect with like-minded people.",
  },
};


interface ExplorePageProps {}

const ExplorePage = async ({}: ExplorePageProps) => {
  const popularCommunities = await db.community.findMany({
    include: {
      _count: true,
    },
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
      <div className="pt-6 flex items-center gap-x-2.5 md:gap-x-3.5 text-lg font-bold">
        <TrendingUp className="font-medium" />
        <span>POPULAR ON Z</span>
      </div>
      <PopularCommunities popularCommunities={popularCommunities} />
      <div className="pt-6 rounded-lg flex items-center gap-x-2.5 md:gap-x-3.5 text-lg font-bold">
        <Layers className="font-medium" />
        <span>RECOMMENDED FOR YOU</span>
      </div>
      {/* @ts-expect-error Server Component */}
      <ExploreFeed />
    </div>
  );
};

export default ExplorePage;
