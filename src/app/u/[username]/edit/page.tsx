import { getAuthSession } from "@/lib/auth";
import EditProfile from "@/components/profile/EditProfile";
import { db } from "@/lib/db";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getAuthSession();
  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  const displayName = user?.displayName ?? user?.name;

  const userMetaName = user?.username;

  const title = `${displayName} (u/@${userMetaName}) • Edit Profile`;

  const description = `Edit your profile on Z`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: user?.image ?? "https://joshuaedo.sirv.com/Z/Z.png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image", // Use summary_large_image for the Edit Profile page
      title,
      description,
      images: [user?.image ?? "https://joshuaedo.sirv.com/Z/Z.png"],
    },
  };
}

// Rest of your code for the EditProfilePage component...


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
