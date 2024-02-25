import SignInFireWall from '@/components/features/auth/SignInFireWall';

export const metadata = {
  title: "Sign In to Z",
  description: "Sign in to your Z account and join the conversation. Explore diverse communities and stay updated with the latest posts.",
  openGraph: {
    title: "Sign In to Z",
    description: "Sign in to your Z account and join the conversation. Explore diverse communities and stay updated with the latest posts.",
  },
  twitter: {
    card: "summary",
    title: "Sign In to Z",
    description: "Sign in to your Z account and join the conversation. Explore diverse communities and stay updated with the latest posts.",
  },
};


const SignInPage = () => {
  return <SignInFireWall />
};

export default SignInPage;
