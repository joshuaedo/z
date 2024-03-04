"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { MoreVertical } from "lucide-react";
import { PostDeletionRequest } from "@/validators/post";
import { toast } from "@/hooks/use-toast";
import React, { FC, startTransition } from "react";
import { Post, User, Vote } from "@prisma/client";

interface DeletePostProps {
  post:
    | (Post & {
        votes: Vote[];
        author: User;
      })
    | null;
  isPage?: boolean;
  setIsPostDeleted?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeletePost: FC<DeletePostProps> = ({
  post,
  isPage = false,
  setIsPostDeleted,
}) => {
  const router = useRouter();
  const { mutate: deletePost } = useMutation({
    mutationFn: async ({ postId, postAuthorId }: PostDeletionRequest) => {
      if (!isPage && setIsPostDeleted) {
        setIsPostDeleted(true);
      }
      const payload: PostDeletionRequest = {
        postId,
        postAuthorId,
      };
      const { data } = await axios.post("/api/posts/delete", payload);
      return data;
    },
    onError: () => {
      if (!isPage && setIsPostDeleted) {
        setIsPostDeleted(false);
      }
      toast({
        title: "Action Failed",
        description: "Your post was not deleted, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        isPage ? router.back() : router.refresh();
      });

      return toast({
        description: "Your post has been deleted.",
        variant: "default",
      });
    },
  });

  async function onClickDelete() {
    if (post?.id) {
      const payload: PostDeletionRequest = {
        postId: post.id,
        postAuthorId: post.author.id,
      };

      deletePost(payload);
    }
  }

  return (
    <>
      <div className="absolute top-1.5 right-0">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                onClickDelete(); // Trigger the delete operation
              }}
              className="cursor-pointer"
            >
              Delete Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default DeletePost;
