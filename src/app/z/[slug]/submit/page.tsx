import SubmitPost from '@/components/features/posts/SubmitPost';
import { getCommunityByName } from '@/lib/community';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Submit a Post / Z',
  description: 'Submit a post to a community on Z and join the discussion.',
  openGraph: {
    title: 'Submit a Post / Z',
    description: 'Submit a post to a community on Z and join the discussion.',
  },
  twitter: {
    card: 'summary',
    title: 'Submit a Post / Z',
    description: 'Submit a post to a community on Z and join the discussion.',
  },
};

interface SubmitPageProps {
  params: {
    slug: string;
  };
}

const SubmitPage = async ({ params }: SubmitPageProps) => {
  const community = await getCommunityByName(params.slug, 'posts');

  if (!community) return notFound();

  return <SubmitPost community={community} params={params} />;
};

export default SubmitPage;
