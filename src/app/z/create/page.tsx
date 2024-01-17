import CreateCommunity from '@/components/communities/CreateCommunity';
import { getAuthSession } from '@/lib/auth';

export const metadata = {
  title: 'Create a Community / Z',
  description: 'Create your own community on Z and start the conversation.',
  openGraph: {
    title: 'Create a Community / Z',
    description: 'Create your own community on Z and start the conversation.',
  },
  twitter: {
    card: 'summary',
    title: 'Create a Community / Z',
    description: 'Create your own community on Z and start the conversation.',
  },
};

interface CreateCommunityPageProps {}

const CreateCommunityPage = async ({}: CreateCommunityPageProps) => {
  const session = await getAuthSession();

  return <CreateCommunity session={session} />;
};

export default CreateCommunityPage;
