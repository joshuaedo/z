import { getAuthSession } from '@/lib/auth';
import EditProfile from '@/components/profile/EditProfile';

interface EditProfilePageProps {}

const EditProfilePage = async ({}: EditProfilePageProps) => {
  const session = await getAuthSession();

  return <EditProfile session={session} />;
};

export default EditProfilePage;
