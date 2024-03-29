import EditCommunity from '@/components/features/communities/EditCommunity';
import { getAuthSession } from '@/lib/auth';
import { getCommunityByName } from '@/lib/community';
import { db } from '@/lib/db';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface EditCommunityPageProps {
  params: {
    slug: string;
  };
}

export const generateMetadata = async ({
  params,
}: EditCommunityPageProps): Promise<Metadata> => {
  const community = await getCommunityByName(params.slug);

  return {
    title: `Edit ${community?.name ?? 'Community'} / Z`,
    description: community?.description ?? 'Edit Community',
    openGraph: {
      title: `Edit ${community?.name ?? 'Community'} / Z`,
      description: community?.description ?? 'Edit Community',
      images: [
        {
          url: community?.image ?? 'https://joshuaedo.sirv.com/Z/Z.png',
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `Edit ${community?.name ?? 'Community'} / Z`,
      description: community?.description ?? 'Edit Community',
      images: [community?.image ?? 'https://joshuaedo.sirv.com/Z/Z.png'],
    },
  };
};

const EditCommunityPage = async ({ params }: EditCommunityPageProps) => {
  const session = await getAuthSession();

  const community = await getCommunityByName(params.slug);

  if (!community) return notFound();

  return <EditCommunity session={session} community={community} />;
};

export default EditCommunityPage;
