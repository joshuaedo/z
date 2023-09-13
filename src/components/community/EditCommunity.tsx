"use client";

import React, { FC } from "react";

import { Session } from "next-auth";
import EditCommunityForm from "./EditCommunityForm";
interface EditCommunityProps {
  session: Session | null;
}

const EditCommunity: FC<EditCommunityProps> = ({ session }) => {
  return (
    <div className="rounded-md bg-white shadow px-4 md:px-6 py-4 space-y-5">
      <h2 className="text-xl font-semibold">Edit Community</h2>
      <hr />
      <EditCommunityForm />
    </div>
  );
};

export default EditCommunity;
