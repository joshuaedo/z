import PrivacyPolicy from '@/components/pages/PrivacyPolicy';

export const metadata = {
  title: 'Privacy Policy / Z',
  description: 'Learn about the privacy policy for Z.',
  openGraph: {
    title: 'Privacy Policy / Z',
    description: 'Learn about the privacy policy for Z.',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy / Z',
    description: 'Learn about the privacy policy for Z.',
  },
};


const PrivacyPolicyPage = () => {
  return (
    <div className='flex justify-center items-center'>
      <PrivacyPolicy />
    </div>
  );
};

export default PrivacyPolicyPage;
