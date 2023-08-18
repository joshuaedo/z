import Link from "next/link";
import { Icons } from "./Icons";
import UserAuthForm from "./UserAuthForm";

const SignUp = () => {
    return (
        <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[25rem]">
            <div className="flex flex-col space-y-2 text-center">
                <Icons.logo className="mx-auto h-7 w-7" />
                <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
                <p className="text-sm max-w-xs mx-auto">
                    By continuing, you agree to our{" "}<Link href="/terms-of-service" className="hover:text-zinc-800 text-sm underline underline-offset-4">terms of service</Link>{" "}and{" "}<Link href="/privacy-policy" className="hover:text-zinc-800 text-sm underline underline-offset-4">privacy policy</Link>.
                </p>

                {/* Sign In Form */}
                <UserAuthForm />

                <p className="px-8 text-center text-sm text-zinc-700">
                    Already a member?{" "}
                    <Link href="/sign-in" className="hover:text-zinc-800 text-sm underline underline-offset-4">Sign In</Link>
                </p>
            </div>
        </div>
    );
};


export default SignUp;