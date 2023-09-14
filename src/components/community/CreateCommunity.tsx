"use client";

import React, { FC } from "react";

import { Session } from "next-auth";
import EditCommunityForm from "./EditCommunityForm";
interface CreateCommunityProps {
  session: Session | null;
}

const CreateCommunity: FC<CreateCommunityProps> = ({ session }) => {
  return (
    <div className="rounded-md bg-white shadow px-4 md:px-6 py-4 space-y-5">
      <h2 className="text-xl font-semibold">Create Community</h2>
      <hr />
      {/* @ts-expect-error Server Component */}
      <EditCommunityForm />
    </div>
  );
};

export default CreateCommunity;
