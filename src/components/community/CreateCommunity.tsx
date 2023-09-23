"use client";

import React, { FC } from "react";

import { Session } from "next-auth";
import CreateCommunityForm from "./CreateCommunityForm";
interface CreateCommunityProps {
  session: Session | null;
}

const CreateCommunity: FC<CreateCommunityProps> = ({ session }) => {
  return (
    <div className="rounded-md shadow px-4 md:px-6 py-4 space-y-5">
      <h2 className="text-xl font-semibold">Create Community</h2>
      <hr />
      <CreateCommunityForm />
    </div>
  );
};

export default CreateCommunity;
