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
  console.log(slug);
  const editSlug = slug.replace("/edit", "");
  console.log(editSlug);

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
