import TermsOfService from '@/components/pages/TermsOfService';

export const metadata = {
  title: "Terms of Service / Z",
  description: "Read and understand the Terms of Service for Z.",
  openGraph: {
    title: "Terms of Service / Z",
    description: "Read and understand the Terms of Service for Z.",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service / Z",
    description: "Read and understand the Terms of Service for Z.",
  },
};

const TermsOfServicePage = () => {
  return (
    <div className='flex justify-center items-center'>
      <TermsOfService />
    </div>
  );
};

export default TermsOfServicePage;
