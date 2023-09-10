'use client';

import React, { FC } from 'react';
import EditProfileForm from './EditProfileForm';
import { Session } from 'next-auth';

interface EditProfileProps {
  session: Session | null;
}

const EditProfile: FC<EditProfileProps> = ({ session }) => {
  return (
    <div>
      <EditProfileForm />
    </div>
  );
};

export default EditProfile;
