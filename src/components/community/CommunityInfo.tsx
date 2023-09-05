"use client"

import { FC } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from "@radix-ui/react-icons"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from '../ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';

interface CommunityInfoProps {
  community: {
    id: string;
    name: string;
    createdAt: Date;
    creatorId: string | null;
  };
  memberCount: number;
}

const CommunityInfo: FC<CommunityInfoProps> = ({
  community,
  memberCount,
}) => {
  return (  
      <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
          <h1 className='font-bold text-3xl md:text-4xl h-14'>z/{community.name}</h1>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
          <div className='px-6 py-4'>
                <p className='font-semi-bold py-3'>About z/{community.name}</p>
            </div>
            <p className="text-sm">
              Community description
            </p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                  <time dateTime={community.createdAt.toDateString()}>
                    {`Created on ${format(community.createdAt, 'MMMM d, yyyy')}`}
                </time>
              </span>
              <div className='flex justify-between gap-x-4 py-3'>
                <dt className='text-gray-500'>Members</dt>
                  <dd className='text-gray-700'>
                   <div className='text-gray-900'>{memberCount}</div>
               </dd>
              </div>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CommunityInfo;
