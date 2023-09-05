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
import { Users } from 'lucide-react';

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
        <Button className='font-bold text-3xl md:text-4xl' variant="link">
           z/{community.name}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
          <div className="space-y-1">

            <div className=''>
                <p className='font-bold'>About z/{community.name}</p>
            </div>

            <div className=''>
                <p className='text-sm'>This is the community&apos;s description.</p>
            </div>

            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
               <span className="text-xs text-muted-foreground">
                  <time dateTime={community.createdAt.toDateString()}>
                    {`Created on ${format(community.createdAt, 'MMMM d, yyyy')}`}
                </time>
              </span>
            </div>

            <div className="flex items-center pt-2">
              <Users className="mr-2 h-4 w-4 opacity-70" />{" "}
               <span className="text-xs text-muted-foreground">
                  <time dateTime={community.createdAt.toDateString()}>
                    {`${memberCount} member${memberCount > 1 ? "s" : ""}`}
                </time>
              </span>
            </div>

          </div>
      </HoverCardContent>

    </HoverCard>
  )
}

export default CommunityInfo;
