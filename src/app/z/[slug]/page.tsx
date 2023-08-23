import MiniCreatePost from "@/components/MiniCreatePost";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        slug: string;
    };
}

const Page = async ({ params }: PageProps) => {
    const { slug } = params;

    const session = await getAuthSession();

    const community = await db.community.findFirst({
        where: { name: slug },
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true,
                    comments: true,
                    community: true,
                },

                take: INFINITE_SCROLLING_PAGINATION_RESULTS
            }
        }

    });

    if (!community) {
        return notFound();
    }

    return (
        <div>
            <h1 className="font-bold text-3xl md:text-4xl h-14">z/{community.name}</h1>
      <MiniCreatePost session={session}  />
        </div>
    );
};

export default Page;