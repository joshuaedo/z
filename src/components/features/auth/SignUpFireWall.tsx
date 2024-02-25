import React, { FC } from "react";
import SignUp from "./SignUp";

interface SignUpFireWallProps {}

const SignUpFireWall: FC<SignUpFireWallProps> = ({}) => {
  return (
    <div className="rounded-md bg-white dark:bg-[#000000] shadow dark:border border-[#333333] md:px-6 h-[70vh] flex justify-center items-center">
      <SignUp />
    </div>
  );
};

export default SignUpFireWall;
