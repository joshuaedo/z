import SubmitPost from "@/components/posts/SubmitPost";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface SubmitPageProps {
    params: {
        slug: string;
    };
}

const SubmitPage = async ({ params }: SubmitPageProps) => {

const community = await db.community.findFirst({
    where: {
        name: params.slug
    }
})

if(!community) return notFound()
    
    return (
       <SubmitPost community={community} params={params} />
    );
};

export default SubmitPage;