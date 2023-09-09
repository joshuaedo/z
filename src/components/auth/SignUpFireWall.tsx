import React, { FC } from 'react';
import SignUp from './SignUp';

interface SignUpFireWallProps {}

const SignUpFireWall: FC<SignUpFireWallProps> = ({}) => {
  return (
    <div className='rounded-md bg-white shadow md:px-6 h-[70%] flex justify-center items-center'>
      <SignUp />
    </div>
  );
};

export default SignUpFireWall;