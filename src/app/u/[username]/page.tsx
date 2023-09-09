import SignInFireWall from '@/components/auth/SignInFireWall';
import { getAuthSession } from '@/lib/auth';
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { db } from '@/lib/db';
import PostFeed from '@/components/feeds/PostFeed';
import type { Metadata } from 'next';
import ProfileCard from '@/components/ui/ProfileCard';

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

  const posts = await db.post.findMany({
    where: {
      authorId: session?.user.id,
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

  const user = await db.user.findUnique({
    where: {
      username: username,
    },
  });

  return session ? (
    <div className='space-y-6'>
      <ProfileCard user={user} />
      <PostFeed initialPosts={posts} />
    </div>
  ) : (
    <SignInFireWall />
  );
};

export default ProfilePage;
