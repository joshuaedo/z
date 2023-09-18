import PopularCommunities from "@/components/community/PopularCommunities";
import ExploreFeed from "@/components/feeds/ExploreFeed";
import SearchBar from "@/components/ui/SearchBar";
import { db } from "@/lib/db";
import { Layers } from "lucide-react";

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
      <PopularCommunities popularCommunities={popularCommunities} />
      <div className="mt-3 py-3 pr-4 rounded-lg text-zinc-900 flex items-center gap-x-2.5 md:gap-x-3.5 text-sm font-semibold">
        <Layers />
        <span>RECOMMENDED FOR YOU</span>
      </div>
      {/* @ts-expect-error Server Component */}
      <ExploreFeed />
    </div>
  );
};

export default ExplorePage;
