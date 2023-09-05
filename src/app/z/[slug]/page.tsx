
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import PostFeed from '@/components/feeds/PostFeed';
import SubscribeLeaveToggle from '@/components/SubscribeLeaveToggle';
import AddCommunityPost from '@/components/community/AddCommunityPost';
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

      <div className="flex w-fit items-center justify-center">
        {/* Community Name & Info */}
        <CommunityInfo
        community={community}
        memberCount={memberCount}
      />
      {/* Community Status */}
      <div className="ml-2">
       {community.creatorId === session?.user.id ? (
          <div
          className='bg-purple-500 text-zinc-900 rounded-full font-semibold py-1 px-2 border border-zinc-900'
         >
          Creator
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
      </div>

       {/* Community Menu */}
      <CommunityMenu session={session} />

      {/* Community Feed */}
      <PostFeed initialPosts={community.posts} communityName={community.name} />
    </div>
  );
};

export default SlugPage;
