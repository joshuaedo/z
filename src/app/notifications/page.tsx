import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Metadata } from "next";
import Notifications from "@/components/pages/Notifications";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getAuthSession();
  let user;
  if (session) {
    user = await db.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });
  }

  const title = `Notifications • Z`;

  const description = `See your notifications on Z.`;

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
      card: "summary_large_image",
      title,
      description,
      images: [user?.image ?? "https://joshuaedo.sirv.com/Z/Z.png"],
    },
  };
}

const NotificationsPage = async () => {
  const session = await getAuthSession();
  let notifications;
  if (session) {
    notifications = await db.notification.findMany({
      where: {
        recipientId: session?.user?.id,
        read: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        sender: true,
        post: {
          include: {
            community: true,
            votes: true,
            author: true,
            comments: true,
          },
        },
        subscribe: {
          include: {
            community: true,
          },
        },
        comment: true,
      },
    });
  }

  return <Notifications session={session} notifications={notifications} />;
};

export default NotificationsPage;
