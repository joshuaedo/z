"use client";
import Link from "next/link";
import { Icons } from "../ui/Icons";
import UserAuthForm from "./UserAuthForm";

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[25rem]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-7 w-7" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-xs max-w-xs mx-auto">
          By continuing, you agree to our{" "}
          <a
            href="/terms-of-service"
            className={"p-0 text-xs underline underline-offset-2"}
          >
            terms of service
          </a>{" "}
          and{" "}
          <a
            href="/privacy-policy"
            className={"p-0 text-xs underline underline-offset-2"}
          >
            privacy policy.
          </a>
        </p>

        {/* Sign In Form */}
        <UserAuthForm />

        <p className="px-4 md:px-8 text-center text-sm text-muted-foreground">
          New to Z?{" "}
          <Link
            href="/sign-up"
            className="hover:text-muted-foreground text-sm underline underline-offset-4"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
