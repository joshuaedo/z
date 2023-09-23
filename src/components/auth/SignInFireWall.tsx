import React, { FC } from "react";
import SignIn from "./SignIn";

interface SignInFireWallProps {}

const SignInFireWall: FC<SignInFireWallProps> = ({}) => {
  return (
    <div className="rounded-md bg-white dark:bg-[#14171A] shadow dark:border border-[#333333] md:px-6 h-[70vh] flex justify-center items-center">
      <SignIn />
    </div>
  );
};

export default SignInFireWall;
