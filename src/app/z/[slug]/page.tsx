import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import PostFeed from '@/components/feeds/PostFeed';
import SubscribeLeaveToggle from '@/components/SubscribeLeaveToggle';
import AddCommunityPost from '@/components/community/AddCommunityPost';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns/esm';
import { Users } from 'lucide-react';

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

  const isCreator = community.creatorId === session?.user.id;

  const memberCount = await db.subscription.count({
    where: {
      community: {
        name: slug,
      },
    },
  });

  return (
    <div className='space-y-6'>
      <div className='flex w-fit items-center justify-center'>
        {/* Community Name & Info */}
        <h2 className='font-bold text-3xl md:text-4xl'>z/{community.name}</h2>
        {/* Community Status */}
        {isCreator ? (
          <div className='bg-purple-500 text-zinc-900 rounded-full font-semibold py-1 px-2 border border-zinc-900 mx-2'>
            Creator
          </div>
        ) : null}
        {!isCreator ? (
          <SubscribeLeaveToggle
            isSubscribed={isSubscribed}
            communityId={community.id}
            communityName={community.name}
          />
        ) : null}
      </div>

      <div className='space-y-1 overflow-hidden rounded-md bg-white shadow h-full px-5 py-4'>
        {community?.description && (
          <div className=''>
            <p className='text-sm'>{community?.description}.</p>
          </div>
        )}

        <div className='flex items-center pt-2'>
          <CalendarIcon className='mr-2 h-4 w-4 opacity-70' />{' '}
          <span className='text-xs text-muted-foreground'>
            <time dateTime={community.createdAt.toDateString()}>
              {`Created on ${format(community.createdAt, 'MMMM d, yyyy')}`}
            </time>
          </span>
        </div>

        <div className='flex items-center pt-2'>
          <Users className='mr-2 h-4 w-4 opacity-70' />{' '}
          <span className='text-xs text-muted-foreground'>
            <time dateTime={community.createdAt.toDateString()}>
              {`${memberCount} member${memberCount > 1 ? 's' : ''}`}
            </time>
          </span>
        </div>
      </div>

      {/* Community Menu */}
      <AddCommunityPost session={session} isCreator={isCreator} />

      {/* Community Feed */}
      <PostFeed initialPosts={community.posts} communityName={community.name} />
    </div>
  );
};

export default SlugPage;
