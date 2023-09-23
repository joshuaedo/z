import SignInFireWall from "@/components/auth/SignInFireWall";
import { getAuthSession } from "@/lib/auth";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";
import type { Metadata } from "next";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileFeed from "@/components/feeds/profile/ProfileFeed";

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = params;

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  const displayName = user?.displayName ?? user?.name;

  const userMetaName = user?.username ?? username;

  const title =
    userMetaName !== undefined
      ? `${displayName} (u/${userMetaName}) • Z`
      : "guest / Z";

  const description = "View " + `${displayName}'s profile`;

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
      card: "summary",
      title,
      description,
      images: [user?.image ?? "https://joshuaedo.sirv.com/Z/Z.png"],
    },
  };
}

interface ProfilePageProps {
  params: {
    username: string;
  };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { username } = params;

  const session = await getAuthSession();

  const user = await db.user.findUnique({
    where: {
      username: username,
    },
  });

  const posts = await db.post.findMany({
    where: {
      authorId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      community: true,
    },
  });

  const replies = await db.post.findMany({
    where: {
      comments: {
        some: {
          authorId: user?.id,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      community: true,
    },
  });

  const subscriptions = await db.subscription.findMany({
    where: {
      userId: user?.id,
    },
  });

  const createdCommunities = await db.community.findMany({
    where: {
      Creator: user,
    },
  });

  return session ? (
    <div className="space-y-6">
      <ProfileCard
        user={user}
        session={session}
        subscriptions={subscriptions}
        createdCommunities={createdCommunities}
      />
      <ProfileFeed posts={posts} replies={replies} />
    </div>
  ) : (
    <SignInFireWall />
  );
};

export default ProfilePage;
