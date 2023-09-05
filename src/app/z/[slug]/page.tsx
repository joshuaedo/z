
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import PostFeed from '@/components/feeds/PostFeed';
import SubscribeLeaveToggle from '@/components/SubscribeLeaveToggle';
import CommunityMenu from '@/components/community/CommunityMenu';
import CommunityInfo from '@/components/community/CommunityInfo';

interface SlugPageProps {
  params: {
    slug: string;
  };
}

const SlugPage = async ({ params }: SlugPageProps) => {
  const { slug } = params;

  const session = await getAuthSession();

  const community = await db.community.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          community: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  });

  if (!community) {
    return notFound();
  }

  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          community: {
            name: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubscribed = !!subscription;

  const memberCount = await db.subscription.count({
    where: {
      community: {
        name: slug,
      },
    },
  });

  return (
    <div className='space-y-6'>

      <div>
        {/* Community Name */}
      <h1 className='font-bold text-3xl md:text-4xl h-14'>
        z/{community.name}
      </h1>
      {/* Community Status */}
       {community.creatorId === session?.user.id ? (
          <div className='flex justify-between gap-x-4 py-3'>
            <p className='text-gray-500'>You created this community</p>
          </div>
        ) : null}
        {community.creatorId !== session?.user.id ? (
          <SubscribeLeaveToggle
            isSubscribed={isSubscribed}
            communityId={community.id}
            communityName={community.name}
          />
        ) : null}
      </div>

       {/* Community Menu */}
      <CommunityMenu session={session} />
      <CommunityInfo
        community={community}
        memberCount={memberCount}
      />

      {/* Community Feed */}
      <PostFeed initialPosts={community.posts} communityName={community.name} />
    </div>
  );
};

export default SlugPage;
