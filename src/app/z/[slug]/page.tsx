
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import PostFeed from '@/components/feeds/PostFeed';
import SubscribeLeaveToggle from '@/components/SubscribeLeaveToggle';
import CommunityMenu from '@/components/community/CommunityMenu';
import CommunityInfo from '@/components/community/CommunityInfo';
import { Button } from '@/components/ui/Button';

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

      <div className="flex w-fit items-center justify-between">
        {/* Community Name & Info */}
        <CommunityInfo
        community={community}
        memberCount={memberCount}
      />
      {/* Community Status */}
       {community.creatorId === session?.user.id ? (
          <Button
          className='w-full mt-1 mb-4 rounded-[50%]'
         >
          Creator
        </Button>
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

      {/* Community Feed */}
      <PostFeed initialPosts={community.posts} communityName={community.name} />
    </div>
  );
};

export default SlugPage;
