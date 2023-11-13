import CommentSection from "@/components/comments/CommentSection";
import EditorOutput from "@/components/editor/EditorOutput";
import PostVoteServer from "@/components/posts/post-vote/PostVoteServer";
import { Button } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { cn, formatTimeToNow } from "@/lib/utils";
import { CachedPost } from "@/types/redis";
import { Post, User, Vote } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { ArrowBigDown } from "lucide-react";
import { ArrowBigUp } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import DeletePost from "@/components/posts/DeletePost";

interface PostPageProps {
  params: {
    postId: string;
  };
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const generateMetadata = async ({
  params,
}: PostPageProps): Promise<Metadata> => {
  let post:
    | (Post & {
        votes: Vote[];
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
      card: "summary_large_image",
      title,
      description,
    },
  };
};

const PostPage = async ({ params }: PostPageProps) => {
  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`,
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

  const community = await db.community.findFirst({
    where: {
      id: params.postId,
    },
  });

  const titleExists = post?.title && post?.title !== "" && post?.title !== " ";
  const session = await getAuthSession();
  const isAuthor = session?.user.id === post?.author.id;
  const communityName = community?.name;

  // console.log(post)

  if (!post && !cachedPost) return notFound();

  return (
    <>
      <div className="rounded-md bg-white dark:bg-[#000000] shadow dark:border border-[#333333]">
        <div
          className={`${
            titleExists ? "py-4" : "py-2"
          } pr-4 md:px-6  flex justify-between`}
        >
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

          <div className="w-0 flex-1 relative">
            <div className={`mt-1 text-2xs text-muted-foreground`}>
              {communityName ? (
                <>
                  <a
                    className="underline dark:text-white text-sm underline-offset-2"
                    href={`/z/${communityName}`}
                  >
                    z/{communityName}
                  </a>

                  <span className="px-1">•</span>
                </>
              ) : null}
              {(post?.author?.username || cachedPost?.authorUsername) && (
                <span className="">
                  Posted by{" "}
                  <EditorOutput content={post?.content ?? cachedPost.content} />
                  <Link href={`/u/${post.author.username}`}>
                    {post?.author?.username?.length < 3
                      ? post?.author?.username ?? cachedPost?.authorUsername
                      : `u/${
                          post?.author?.username ?? cachedPost?.authorUsername
                        }`}
                  </Link>{" "}
                </span>
              )}
              {formatTimeToNow(
                new Date(post?.createdAt ?? cachedPost.createdAt),
              )}
              {isAuthor && <DeletePost post={post} isPage={true} />}
            </div>

            {titleExists && (
              <h1 className="text-lg font-semibold py-2 leading-6 dark:text-white">
                {post?.title ?? cachedPost?.title}
              </h1>
            )}

            <div
              className={`${
                titleExists ? "" : "py-3"
              } relative text-sm w-full overflow-clip`}
            >
              <EditorOutput content={post?.content ?? cachedPost?.content} />
            </div>
          </div>
        </div>

        <div className={`px-4 md:px-6`}>
          <Suspense
            fallback={
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            }
          >
            {/* @ts-expect-error Server Component */}
            <CommentSection postId={post?.id ?? cachedPost.id} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

function PostVoteShell() {
  return (
    <div className="flex flex-col w-12 md:w-20 md:gap-4 md:pr-6 md:pb-4">
      <Button
        size="sm"
        variant="ghost"
        aria-label="upvote"
        className="hidden md:inline-flex"
      >
        <ArrowBigUp className={cn("h-4 w-4 md:h-5 md:w-5")} />
      </Button>
      <button
        aria-label="upvote"
        className="py-2 flex justify-center items-center md:hidden"
      >
        <ArrowBigUp className={cn("h-4 w-4 md:h-5 md:w-5")} />
      </button>

      <div className="text-center py-2 font-medium text-sm">
        <Loader2 className="h-3 w-3 animate-spin" />
      </div>

      <Button
        size="sm"
        variant="ghost"
        aria-label="downvote"
        className="hidden md:inline-flex"
      >
        <ArrowBigDown className={cn("h-4 w-4 md:h-5 md:w-5")} />
      </Button>
      <button
        aria-label="upvote"
        className="py-2 flex justify-center items-center md:hidden"
      >
        <ArrowBigDown className={cn("h-4 w-4 md:h-5 md:w-5")} />
      </button>
    </div>
  );
}

export default PostPage;
