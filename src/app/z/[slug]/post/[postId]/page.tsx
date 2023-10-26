import CommentSection from "@/components/comments/CommentSection";
import EditorOutput from "@/components/editor/EditorOutput";
import PostVoteServer from "@/components/posts/post-vote/PostVoteServer";
import { Button } from "@/components/ui/Button";
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

  if (!post && !cachedPost) return notFound();

  return (
    <div>
      <div className="h-full flex flex-col sm:flex-row items-center sm:items-start justify-between bg-white dark:bg-[#000000] shadow dark:border border-[#333333]">
        <div className="sm:w-0 w-full flex-1 py-2.5 px-2.5 md:py-5 md:px-5 rounded-sm">
          <div className="flex">
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

            <div className="">
              <p className="max-h-40 mt-1 truncate text-xs text-muted-foreground">
                Posted by{" "}
                <Link
                  href={`/u/${
                    post?.author.username ?? cachedPost.authorUsername
                  }`}
                >
                  u/{post?.author.username ?? cachedPost.authorUsername}
                </Link>{" "}
                {formatTimeToNow(
                  new Date(post?.createdAt ?? cachedPost.createdAt),
                )}
              </p>
              <h1 className="text-xl font-semibold py-2 leading-6">
                {post?.title ?? cachedPost.title}
              </h1>

              <EditorOutput content={post?.content ?? cachedPost.content} />
            </div>
          </div>

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
    </div>
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
