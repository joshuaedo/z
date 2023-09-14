"use client";

import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu";
import { useRouter } from "next/navigation";
import { MoreVertical } from "lucide-react";

interface EditCommunityDropdownProps {
  communityPath: string;
}

const EditCommunityDropdown: FC<EditCommunityDropdownProps> = ({
  communityPath,
}) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical className="flex h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            router.push(`/z/${communityPath}/edit`);
          }}
          className="cursor-pointer"
        >
          Edit Community
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditCommunityDropdown;
