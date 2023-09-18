import SubmitPost from "@/components/posts/SubmitPost";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Submit a Post / Z",
    description: "Submit a post to a community on Z and join the discussion.",
    openGraph: {
      title: "Submit a Post / Z",
      description: "Submit a post to a community on Z and join the discussion.",
    },
    twitter: {
      card: "summary",
      title: "Submit a Post / Z",
      description: "Submit a post to a community on Z and join the discussion.",
    },
  };  


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