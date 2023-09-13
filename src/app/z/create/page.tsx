import CreateCommunity from "@/components/community/CreateCommunity";
import { getAuthSession } from "@/lib/auth";

interface CreateCommunityPageProps {}

const CreateCommunityPage = async ({}: CreateCommunityPageProps) => {
  const session = await getAuthSession();

  return <CreateCommunity session={session} />;
};

export default CreateCommunityPage;
