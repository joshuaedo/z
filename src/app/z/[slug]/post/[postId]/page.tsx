import CommentSection from '@/components/features/comments/CommentSection';
import EditorOutput from '@/components/ui/EditorOutput';
import Vote from '@/components/features/votes/Vote';
import { Button } from '@/components/ui/Button';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { redis } from '@/lib/redis';
import { cn, formatTimeToNow } from '@/lib/utils';
import { CachedPost } from '@/types/redis';
import { Post, User, Vote as VoteType } from '@prisma/client';
import { ArrowBigDown } from 'lucide-react';
import { ArrowBigUp } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import DeletePost from '@/components/features/posts/DeletePost';
import { getCommunityById } from '@/lib/community';
import Loader from '@/components/ui/Loader';

interface PostPageProps {
  params: {
    postId: string;
  };
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export const generateMetadata = async ({
  params,
}: PostPageProps): Promise<Metadata> => {
  let post:
    | (Post & {
        votes: VoteType[];
        author: User;
      })
    | null = null;

  post = await db.post.findFirst({
    where: {
      id: params.postId,
    },
    include: {
      author: true,
      votes: true,
    },
  });

  const author = post?.author.username;
  const title = `${author} posted on Z`;
  const description = post?.title;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
};

const PostPage = async ({ params }: PostPageProps) => {
  const community = await getCommunityById(params.postId);
  const session = await getAuthSession();

  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost;

  let post:
    | (Post & {
        votes: VoteType[];
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

  const postId = post?.id ?? cachedPost?.id;
  const postTitle = post?.title ?? cachedPost?.title;
  const titleExists =
    postTitle !== null &&
    postTitle !== undefined &&
    postTitle !== '' &&
    postTitle !== ' ';
  const authorUsername = post?.author?.username ?? cachedPost?.authorUsername;
  const authorId = post?.author?.id;
  const isAuthor = session?.user.id === authorId;
  const communityName = community?.name;

  if (!post && !cachedPost) return notFound();

  return (
    <>
      <div className='rounded-md bg-white dark:bg-[#000000] shadow dark:border border-[#333333]'>
        <div
          className={`${
            titleExists ? 'py-4' : 'py-2'
          } pr-4 md:px-6  flex justify-between`}
        >
          <Suspense fallback={<VoteShell />}>
            {/* @ts-expect-error Server Component */}
            <Vote
              postId={postId}
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

          <div className='w-0 flex-1 relative'>
            <div className={`mt-1 text-2xs text-muted-foreground`}>
              {communityName ? (
                <>
                  <a
                    className='underline dark:text-white text-sm underline-offset-2'
                    href={`/z/${communityName}`}
                  >
                    z/{communityName}
                  </a>

                  <span className='px-1'>•</span>
                </>
              ) : null}
              {authorUsername && (
                <span className=''>
                  Posted by{' '}
                  <Link href={`/u/${authorUsername}`}>
                    {authorUsername?.length! < 3
                      ? authorUsername
                      : `u/${authorUsername}`}
                  </Link>{' '}
                </span>
              )}
              {formatTimeToNow(
                new Date(post?.createdAt ?? cachedPost.createdAt)
              )}
              {isAuthor && <DeletePost post={post} isPage={true} />}
            </div>

            {titleExists && (
              <h1 className='text-lg font-semibold py-2 leading-6 dark:text-white'>
                {postTitle}
              </h1>
            )}

            <div
              className={`${
                titleExists ? '' : 'py-3'
              } relative text-sm w-full overflow-clip`}
            >
              <EditorOutput content={post?.content ?? cachedPost?.content} />
            </div>
          </div>
        </div>

        <div className={`px-4 md:px-6`}>
          <Suspense fallback={<Loader />}>
            {/* @ts-expect-error Server Component */}
            <CommentSection postId={postId} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

function VoteShell() {
  return (
    <div className='flex flex-col w-12 md:w-20 md:gap-4 md:pr-6 md:pb-4'>
      <Button
        size='sm'
        variant='ghost'
        aria-label='upvote'
        className='hidden md:inline-flex'
      >
        <ArrowBigUp className={cn('h-4 w-4 md:h-5 md:w-5')} />
      </Button>
      <button
        aria-label='upvote'
        className='py-2 flex justify-center items-center md:hidden'
      >
        <ArrowBigUp className={cn('h-4 w-4 md:h-5 md:w-5')} />
      </button>

      <Loader />

      <Button
        size='sm'
        variant='ghost'
        aria-label='downvote'
        className='hidden md:inline-flex'
      >
        <ArrowBigDown className={cn('h-4 w-4 md:h-5 md:w-5')} />
      </Button>
      <button
        aria-label='upvote'
        className='py-2 flex justify-center items-center md:hidden'
      >
        <ArrowBigDown className={cn('h-4 w-4 md:h-5 md:w-5')} />
      </button>
    </div>
  );
}

export default PostPage;
