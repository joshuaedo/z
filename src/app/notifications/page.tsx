import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { Metadata } from 'next';
import Notifications from '@/components/pages/Notifications';

export async function generateMetadata(): Promise<Metadata> {
  const session = await getAuthSession();
  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

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

interface NotificationsPageProps {}

const NotificationsPage = async ({}: NotificationsPageProps) => {
  const session = await getAuthSession();

  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  return <Notifications session={session} />;
};

export default NotificationsPage;
