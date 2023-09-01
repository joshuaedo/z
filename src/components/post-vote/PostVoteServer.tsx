import { Post, Vote, VoteType } from "@prisma/client";
import { FC } from "react";

interface PostVoteServerProps {
  postId: string
  initialVotesAmt?: number
  initialVote?: VoteType | null
  getData?: () => Promise<{Post & { votes: Vote[]}} | null>
}

const PostVoteServer: FC<PostVoteServerProps> = ({ 
    postId, initialVote, initialVotesAmt, getData
 }) => {
 

  return (
      <div className=''>
          PostVoteServer
      </div>
  );
};

export default PostVoteServer;
