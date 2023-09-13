import EditCommunity from '@/components/community/EditCommunity';
import { getAuthSession } from '@/lib/auth';

interface EditCommunityPageProps {}

const EditCommunityPage = async ({}: EditCommunityPageProps) => {
  const session = await getAuthSession();

  return <EditCommunity session={session} />;
};

export default EditCommunityPage;