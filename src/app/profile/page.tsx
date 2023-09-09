import SignInFireWall from '@/components/auth/SignInFireWall';
import ProfileFeed from '@/components/feeds/ProfileFeed';
import { getAuthSession } from '@/lib/auth';

export const metadata = {
  title: 'Profile / Z',
  description: '',
  openGraph: {
    title: 'Profile / Z',
    description: '',
    images: [
      {
        url: '',
        width: 200,
        height: 200,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Profile / Z',
    description: '',
    images: [''],
  },
};

interface ProfilePageProps {}

const ProfilePage = async ({}: ProfilePageProps) => {
  const session = await getAuthSession();

  return session ? (
    // @ts-expect-error Server Component *
    <ProfileFeed />
  ) : (
    <SignInFireWall />
  );
};

export default ProfilePage;
