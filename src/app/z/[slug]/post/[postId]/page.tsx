import PostVoteServer from '@/components/post-vote/PostVoteServer';
import { Button } from '@/components/ui/Button';
import { db } from '@/lib/db';
import { redis } from '@/lib/redis';
import { cn } from '@/lib/utils';
import { CachedPost } from '@/types/redis';
import { Post, User, Vote } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { ArrowBigDown } from 'lucide-react';
import { ArrowBigUp } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface PostPageProps {
  params: {
    postId: string;
  };
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const PostPage = async ({ params }: PostPageProps) => {
  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost;

  let post:
    | (Post & {
        votes: Vote[];
        author: User;
      })
    | null = null;

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        author: true,
        votes: true,
      },
    });
  }

  if (!post && !cachedPost) return notFound();

  return (
    <div>
      <div className='h-full flex flex-col sm:flex-row items-center sm:items-start justify-between'>
        <Suspense fallback={<PostVoteShell />}>
          {/* @ts-expect-error Server Component */}
          <PostVoteServer
            postId={post?.id ?? cachedPost.id}
            getData={async () => {
              return await db.post.findUnique({
                where: {
                  id: params.postId,
                },
                include: {
                  votes: true,
                },
              });
            }}
          />
        </Suspense>
      </div>
    </div>
  );
};

function PostVoteShell() {
  return (
    <div className='flex flex-col w-12 md:w-20 md:gap-4 md:pr-6 md:pb-4'>
      <Button
        size='sm'
        variant='ghost'
        aria-label='upvote'
        className='hidden md:inline-flex'
      >
        <ArrowBigUp className={cn('h-4 w-4 md:h-5 md:w-5 text-zinc-700')} />
      </Button>
      <button
        aria-label='upvote'
        className='py-2 flex justify-center items-center md:hidden'
      >
        <ArrowBigUp className={cn('h-4 w-4 md:h-5 md:w-5 text-zinc-700')} />
      </button>

      <div className='text-center py-2 font-medium text-sm text-zinc-900'>
        <Loader2 className='h-3 w-3 animate-spin' />
      </div>

      <Button
        size='sm'
        variant='ghost'
        aria-label='downvote'
        className='hidden md:inline-flex'
      >
        <ArrowBigDown className={cn('h-4 w-4 md:h-5 md:w-5 text-zinc-700')} />
      </Button>
      <button
        aria-label='upvote'
        className='py-2 flex justify-center items-center md:hidden'
      >
        <ArrowBigDown className={cn('h-4 w-4 md:h-5 md:w-5 text-zinc-700')} />
      </button>
    </div>
  );
}

export default PostPage;
