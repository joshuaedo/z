"use client";

import React, { FC } from "react";

import { Session } from "next-auth";
import EditCommunityForm from "./EditCommunityForm";
import { Community } from "@prisma/client";
interface EditCommunityProps {
  session: Session | null;
  community: Community;
}

const EditCommunity: FC<EditCommunityProps> = ({ session, community }) => {
  return (
    <div className="rounded-md shadow px-4 md:px-6 py-4 space-y-5">
      <h2 className="text-xl font-semibold">Edit Community</h2>
      <hr />
      <EditCommunityForm community={community} />
    </div>
  );
};

export default EditCommunity;
