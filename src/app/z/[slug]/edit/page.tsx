import EditCommunity from "@/components/community/EditCommunity";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

interface EditCommunityPageProps {
  params: {
    slug: string;
  };
}

const EditCommunityPage = async ({ params }: EditCommunityPageProps) => {
  const { slug } = params;
  const editSlug = slug.replace("/edit", "");

  const session = await getAuthSession();

  const community = await db.community.findFirst({
    where: {
      name: editSlug,
    },
  });

  console.log(community);

  return <EditCommunity session={session} />;
};

export default EditCommunityPage;
