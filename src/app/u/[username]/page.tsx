import SignInFireWall from '@/components/auth/SignInFireWall';
import { getAuthSession } from '@/lib/auth';
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { db } from '@/lib/db';
import PostFeed from '@/components/feeds/PostFeed';
import type { Metadata } from 'next';
import { format } from 'date-fns';
import UserAvatar from '@/components/ui/UserAvatar';
import Image from 'next/image';

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
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
      <p>{user?.bio}</p>
      <time dateTime={user?.emailVerified?.toDateString()}>
        {user?.emailVerified
          ? `Joined on ${format(user.emailVerified, 'MMMM d, yyyy')}`
          : ''}
      </time>
      <time dateTime={user?.birthday?.toDateString()}>
        {user?.birthday
          ? `Birthday is ${format(user.birthday, 'MMMM d, yyyy')}`
          : ''}
      </time>

      <div className='relative w-full min-h-[15rem]'>
        {user && user.coverImage && user.name && (
          <Image
            alt={user?.name}
            src={user?.coverImage}
            className='object-contain'
            fill
          />
        )}
      </div>
      
      <p>{user?.email}</p>
      <p>{user?.id}</p>
      <UserAvatar
        user={{
          name: user?.name || null,
          image: user?.image || null,
        }}
      />
      <p>{user?.link}</p>
      <p>{user?.name}</p>
      <p>{user?.username}</p>
      <PostFeed feedType='regular' initialPosts={posts} />
    </div>
  ) : (
    <SignInFireWall />
  );
};

export default ProfilePage;
