import React, { FC } from 'react';
import SignIn from './SignIn';

interface SignInFireWallProps {}

const SignInFireWall: FC<SignInFireWallProps> = ({}) => {
  return (
    <div className='rounded-md bg-white shadow md:px-6 h-[70%] flex justify-center items-center'>
      <SignIn />
    </div>
  );
};

export default SignInFireWall;
