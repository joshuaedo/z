"use client"
import Link from "next/link";
import { Icons } from "./Icons";
import UserAuthForm from "./UserAuthForm";
import { useRouter } from "next/navigation";

const SignIn = () => {
 const router = useRouter();

  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[25rem]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-7 w-7" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
           <p className="text-xs max-w-xs mx-auto">
          By continuing, you agree to our{" "}
          <button onClick={() => {
            router.refresh();
            router.push("/terms-of-service");
          }} className={
            'p-0 text-xs text-black underline underline-offset-2'
          }>terms of service</button>
          {" "}and{" "}
          <button onClick={() => {
            router.refresh();
            router.push("/privacy-policy");
          }} className={
            'p-0 text-xs text-black underline underline-offset-2'
          }>privacy policy.</button>
        </p>

        {/* Sign In Form */}
        <UserAuthForm />

        <p className="px-4 md:px-8 text-center text-sm text-zinc-700">
          New to Z?{" "}
          <Link
            href="/sign-up"
            className="hover:text-zinc-800 text-sm underline underline-offset-4"
          >         
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
