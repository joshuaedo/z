import React, { FC } from 'react';
import SignIn from './SignIn';

interface SignInFireWallProps {}

const SignInFireWall: FC<SignInFireWallProps> = ({}) => {
  return (
    <div className='rounded-md bg-white shadow pr-4 md:px-6 py-4  flex justify-center items-center'>
      <SignIn />
    </div>
  );
};

export default SignInFireWall;
