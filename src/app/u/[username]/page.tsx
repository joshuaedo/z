import SignInFireWall from '@/components/auth/SignInFireWall';
import { getAuthSession } from '@/lib/auth';
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { db } from '@/lib/db';
import type { Metadata } from 'next';
import ProfileCard from '@/components/profile/ProfileCard';
import ProfileFeed from '@/components/feeds/ProfileFeed';

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = params;

  return {
    title: `u/${username} • Z`,
    description: '',
    openGraph: {
      title: `u/${username} • Z`,
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
      title: `u/${username} • Z`,
      description: '',
      images: [''],
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
      createdAt: 'desc',
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      community: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
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
      createdAt: 'desc',
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
    <div className='space-y-6'>
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
