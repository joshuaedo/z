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
  const session = await getAuthSession();

  const community = await db.community.findFirst({
    where: {
      name: params.slug,
    },
  });

  if (!community) return notFound();

  return <EditCommunity session={session} community={community} />;
};

export default EditCommunityPage;
