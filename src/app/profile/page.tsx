import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import type { Metadata } from "next";
import ProfileCard from "@/components/features/user/profile/ProfileCard";
import ProfileFeed from "@/components/feeds/profile/ProfileFeed";
import SignInFireWall from "@/components/features/auth/SignInFireWall";
import { getUserByUsername } from "@/lib/user";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata({}): Promise<Metadata> {
  let user;

  const session = await getAuthSession();

  const username = session?.user?.username;

  if (username) {
    user = await getUserByUsername(username);
  }

  const displayName = user?.displayName ?? user?.name;

  const userMetaName = user?.username ?? username;

  const title =
    userMetaName !== undefined
      ? `${displayName} (u/${userMetaName}) • Z`
      : "guest / Z";

  const description =
    "View " + `View ${displayName ? `${displayName}'s` : "your"} profile`;

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

const ProfilePage = async () => {
  let user;

  const session = await getAuthSession();

  const username = session?.user?.username;

  if (username) {
    user = await getUserByUsername(username);
  }

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

  return session && user ? (
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
