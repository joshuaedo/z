import SignUpFireWall from '@/components/auth/SignUpFireWall';

export const metadata = {
  title: "Sign Up for Z",
  description: "Sign up and create your Z account. Join diverse communities, engage in discussions, and share your thoughts on various topics.",
  openGraph: {
    title: "Sign Up for Z",
    description: "Sign up and create your Z account. Join diverse communities, engage in discussions, and share your thoughts on various topics.",
  },
  twitter: {
    card: "summary",
    title: "Sign Up for Z",
    description: "Sign up and create your Z account. Join diverse communities, engage in discussions, and share your thoughts on various topics.",
  },
};


const SignUpPage = () => {
  return <SignUpFireWall />;
};

export default SignUpPage;
