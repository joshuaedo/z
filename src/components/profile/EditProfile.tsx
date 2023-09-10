'use client';

import React, { FC } from 'react';
import EditProfileForm from './EditProfileForm';
import { Session } from 'next-auth';

interface EditProfileProps {
  session: Session | null;
}

const EditProfile: FC<EditProfileProps> = ({ session }) => {
  return (
    <div className='rounded-md bg-white shadow px-4 md:px-6 py-4 space-y-5'>
      <h2 className='text-xl font-bold'>Edit Profile</h2>
      <hr />
      <EditProfileForm />
    </div>
  );
};

export default EditProfile;
