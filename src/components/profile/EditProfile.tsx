"use client";

import React, { FC } from "react";
import EditProfileForm from "./EditProfileForm";
import { User } from "@prisma/client";

interface EditProfileProps {
  user: User | null;
}

const EditProfile = ({ user }: EditProfileProps) => {
  return (
    <div className="rounded-md bg-white shadow px-4 md:px-6 py-4 space-y-5">
      <h2 className="text-xl font-semibold">Edit Profile</h2>
      <hr />
      <EditProfileForm user={user} />
    </div>
  );
};

export default EditProfile;
