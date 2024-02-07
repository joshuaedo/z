import { getAuthSession } from '@/lib/auth';
import EditProfile from '@/components/features/user/profile/EditProfile';
import { Metadata } from 'next';
import { getUserById } from '@/lib/user';

export async function generateMetadata(): Promise<Metadata> {
  const session = await getAuthSession();
  const user = await getUserById(session?.user?.id);

  const displayName = user?.displayName ?? user?.name;

  const userMetaName = user?.username;

  const title = `${displayName} (u/${userMetaName}) • Z`;

  const description = `Edit your profile`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: user?.image ?? 'https://joshuaedo.sirv.com/Z/Z.png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [user?.image ?? 'https://joshuaedo.sirv.com/Z/Z.png'],
    },
  };
}

interface EditProfilePageProps {}

const EditProfilePage = async ({}: EditProfilePageProps) => {
  const session = await getAuthSession();

  const user = await getUserById(session?.user?.id);

  return <EditProfile user={user} session={session} />;
};

export default EditProfilePage;
