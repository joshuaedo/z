import { getAuthSession } from "@/lib/auth";
import EditProfile from "@/components/profile/EditProfile";
import { db } from "@/lib/db";

interface EditProfilePageProps {}

const EditProfilePage = async ({}: EditProfilePageProps) => {
  const session = await getAuthSession();

  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  return <EditProfile user={user} session={session} />;
};

export default EditProfilePage;
