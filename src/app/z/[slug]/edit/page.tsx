import EditCommunity from "@/components/community/EditCommunity";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface EditCommunityPageProps {
  params: {
    slug: string;
  };
}

const EditCommunityPage = async ({ params }: EditCommunityPageProps) => {
  const { slug } = params;

  const session = await getAuthSession();

  const community = await db.community.findFirst({
    where: {
      name: params.slug,
    },
  });

  if (!community) return notFound();

  console.log(community);

  return <EditCommunity session={session} />;
};

export default EditCommunityPage;
