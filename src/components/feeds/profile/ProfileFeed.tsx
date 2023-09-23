"use client";

import { ExtendedPost } from "@/types/db";
import React, { FC, useState } from "react";
import ProfilePosts from "./ProfilePosts";
import { Suspense } from "react";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/Button";

interface ProfileFeedProps {
  posts: ExtendedPost[];
  replies: ExtendedPost[];
}

const ProfileFeed: FC<ProfileFeedProps> = ({ posts, replies }) => {
  const [isReply, setIsReply] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      <div className="flex w-full items-center justify-center">
        <div className="overflow-hidden max-w-4xl h-fit flex items-center justify-evenly rounded-lg bg-white dark:bg-[#000000] shadow dark:border border-[#333333] px-7 py-5 text-xl">
          <Button
            variant="ghost"
            onClick={() => setIsReply(false)}
            className={`${!isReply ? "font-bold" : "font-medium"}`}
          >
            Posts
          </Button>
          <Button
            variant="ghost"
            onClick={() => setIsReply(true)}
            className={`${isReply ? "font-bold" : "font-medium"}`}
          >
            Replies
          </Button>
        </div>
      </div>
      {!isReply ? (
        <Suspense fallback={<Loader />}>
          {/* @ts-expect-error Server Component */}
          <ProfilePosts initialPosts={posts} />
        </Suspense>
      ) : (
        <Suspense fallback={<Loader />}>
          {/* @ts-expect-error Server Component */}
          <ProfilePosts initialPosts={replies} />
        </Suspense>
      )}
    </div>
  );
};

export default ProfileFeed;
