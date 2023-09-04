import PostFeed from "@/components/feeds/PostFeed";
import HomeFeedToggle from "@/components/HomeFeedToggle";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ExtendedPost } from '@/types/db';
import { FC } from "react";

interface HomePageProps {
  initialPosts: ExtendedPost[]; // Specify the type here
}

{/* @ts-expect-error Server Component */}
const HomePage: FC<HomePageProps> = async ({ initialPosts }) => {

  const session = await getAuthSession()

  return (
      <div className={`relative`}>
      { session && <HomeFeedToggle /> }
      <div className={`${session && "pt-6"}`}>
               
        <PostFeed initialPosts={initialPosts} />
             </div> 
     </div>
  )
}

export default HomePage;


export async function getServerSideProps() {
  try {
    // Fetch all posts from your database
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        votes: true,
        author: true,
        comments: true,
        community: true,
      },
      // You can adjust the take limit as needed
      take: INFINITE_SCROLLING_PAGINATION_RESULTS,
    });

    return {
      props: {
        initialPosts: posts,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        initialPosts: [],
      },
    };
  }
}
