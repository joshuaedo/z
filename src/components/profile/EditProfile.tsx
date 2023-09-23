"use client";

import React, { FC } from "react";
import EditProfileForm from "./EditProfileForm";
import { User } from "@prisma/client";
import { Session } from "next-auth";

interface EditProfileProps {
  user: User | null;
  session: Session | null;
}

const EditProfile = ({ user, session }: EditProfileProps) => {
  return (
    <div className="rounded-m bg-white dark:bg-[#14171A] shadow dark:border border-[#333333] px-4 md:px-6 py-4 space-y-5">
      <h2 className="text-xl font-semibold">Edit Profile</h2>
      <hr />
      <EditProfileForm user={user} session={session} />
    </div>
  );
};

export default EditProfile;
