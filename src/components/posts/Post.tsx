"use client";

import { formatTimeToNow } from "@/lib/utils";
import { Post as PostType, User, Vote } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import { FC, useRef } from "react";
import EditorOutput from "../editor/EditorOutput";
import PostVoteClient from "./post-vote/PostVoteClient";
import Link from "next/link";
import { useSession } from "next-auth/react";
import DeletePost from "./DeletePost";

type PartialVote = Pick<Vote, "type">;

interface PostProps {
  communityName: string;
  post: PostType & {
    author: User;
    votes: Vote[];
  };
  commentAmt: number;
  votesAmt: number;
  currentVote?: PartialVote;
}

const Post: FC<PostProps> = ({
  communityName,
  post,
  commentAmt,
  votesAmt,
  currentVote,
}) => {
  const pRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const isAuthor = session?.user.id === post.author.id;
  const titleExists = post?.title && post?.title !== "" && post?.title !== " ";

  return (
    <>
      <div className="rounded-md bg-white dark:bg-[#000000] shadow dark:border border-[#333333]">
        <div
          className={`${
            titleExists ? "py-4" : "py-2"
          } pr-4 md:px-6  flex justify-between`}
        >
          <PostVoteClient
            postId={post.id}
            initialVotesAmt={votesAmt}
            initialVote={currentVote?.type}
          />

          <div className="w-0 flex-1 relative">
            <div
              className={`${
                titleExists ? "max-h-40" : "max-h-20"
              } mt-1 text-2xs text-muted-foreground pr-4 md:pr-0`}
            >
              {communityName ? (
                <>
                  <a
                    className="underline  dark:text-white text-sm underline-offset-2"
                    href={`/z/${communityName}`}
                  >
                    z/{communityName}
                  </a>

                  <span className="px-1">•</span>
                </>
              ) : null}
              {post?.author?.username && (
                <span className="">
                  Posted by{" "}
                  <Link href={`/u/${post.author.username}`}>
                    {post?.author?.username?.length < 3
                      ? post.author.username
                      : `u/${post.author.username}`}
                  </Link>{" "}
                </span>
              )}
              {formatTimeToNow(new Date(post.createdAt))}
            </div>

            {isAuthor && <DeletePost post={post} isPage={false} />}

            {titleExists && (
              <a href={`/z/${communityName}/post/${post.id}`}>
                <h1 className="text-lg font-semibold py-2 leading-6 dark:text-white">
                  {post.title}
                </h1>
              </a>
            )}

            <div
              className={`${
                titleExists ? "max-h-40" : "max-h-20 py-3"
              } relative text-sm w-full overflow-clip`}
              ref={pRef}
            >
              <a href={`/z/${communityName}/post/${post.id}`}>
                <EditorOutput content={post.content} />
              </a>
              {pRef.current?.clientHeight === 160 ? (
                <div
                  className={`${
                    titleExists ? "h-24" : "h-12"
                  } absolute bottom-0 w-full bg-gradient-to-t from-white  dark:from-black to-transparent`}
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-[#0A0A0A] z-20 text-sm p-4 sm:px-6">
          <a
            className="w-fit flex items-center gap-2"
            href={`/z/${communityName}/post/${post.id}`}
          >
            <MessageSquare className="h-4 w-4" />
            {` ${commentAmt} comment${commentAmt === 1 ? "" : "s"}`}
          </a>
        </div>
      </div>
    </>
  );
};

export default Post;
