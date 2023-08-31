"use client";

import { useCustomToast } from "@/hooks/use-custom-toast";
import { usePrevious } from "@mantine/hooks";
import { VoteType } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostVoteClientProps {
  postId: string
  initialVotesAmt: number
  initialVote?: VoteType | null
}

const PostVoteClient: FC<PostVoteClientProps> = ({ 
    postId, initialVote, initialVotesAmt
 }) => {
 const { loginToast } = useCustomToast()
 const [  votesAmt, setVotesAmt ] = useState<number>(initialVotesAmt)
 const [  currentVote, setCurrentVote ] = useState(initialVote)
 const prevVote = usePrevious(currentVote)

 useEffect(() => {
    setCurrentVote(initialVote)
 }), [initialVote]

  return (
      <div className='flex sm:flex:col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0'>
        <Button size="sm" variant="ghost" aria-label="upvote">
            <ArrowBigUp className={cn("h-5 w-5 tex-zinc-700", {})} />
        </Button>
      </div>
  );
};

export default PostVoteClient;
