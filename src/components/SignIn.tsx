import Link from "next/link";
import { Icons } from "./Icons";

const SignIn = () => {
    return (
        <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[25rem]">
            <div className="flex flex-col space-y-2 text-center">
                <Icons.logo className="mx-auto h-7 w-7" />
                <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                <p className="text-sm max-w-xs mx-auto">
                    By continuing, you are setting up an account on Z and agree to our User Agreement and Privacy Policy.
                </p>

                {/* Sign In Form */}

                <p className="px-8 text-center text-sm text-zinc-700">
                    New to Z?{''}
                    <Link href="/sign-up" className="hover:text-zinc-800 text-sm underline underline-offset-4">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;