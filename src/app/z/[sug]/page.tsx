import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

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
            }
        }

    });
    return (
        <div>
            page
        </div>
    );
};

export default Page;