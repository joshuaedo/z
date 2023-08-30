"use client"

import { useState } from "react";
import Link from "next/link";
import { Icons } from "./Icons";
import UserAuthForm from "./UserAuthForm";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [containerVisible, setContainerVisible] = useState(true); // State to manage container visibility

  const hideContainer = () => {
    setContainerVisible(false);
  };

  return (
    <div className={`container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[25rem] ${containerVisible ? '' : 'hidden'}`}>
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-7 w-7" />
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-xs max-w-xs mx-auto">
          By continuing, you agree to our{" "}
          <button
            onClick={() => {
              hideContainer(); // Hide the container when the button is clicked
              router.replace("/terms-of-service");
            }}
            className="p-0 text-xs text-black underline underline-offset-2"
          >
            terms of service
          </button>{" "}
          and{" "}
          <button
            onClick={() => {
              hideContainer(); // Hide the container when the button is clicked
             router.replace("/privacy-policy");
            }}
            className="p-0 text-xs text-black underline underline-offset-2"
          >
            privacy policy.
          </button>
        </p>

        {/* Sign Up Form */}
        <UserAuthForm />

        <p className="px-4 md:px-8 text-center text-sm text-zinc-700">
          Already joined?{" "}
          <Link
            href="/sign-in"
            className="hover:text-zinc-800 text-sm underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
