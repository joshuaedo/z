import ProfileFeed from '@/components/feeds/ProfileFeed';

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

const ProfilePage = ({}: ProfilePageProps) => {
  return (
    <div>
            ProfilePage
      {/* <ProfileFeed /> */}
    </div>
  );
};

export default ProfilePage;
