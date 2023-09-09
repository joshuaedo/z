import GeneralFeed from '@/components/feeds/GeneralFeed';
import HomeFeedToggle from '@/components/ui/HomeFeedToggle';
import { getAuthSession } from '@/lib/auth';

export const metadata = {
  title: 'Home / Z',
  openGraph: {
    title: 'Home / Z',
  },
  twitter: {
    title: 'Home / Z',
  },
};

export default async function HomePage() {
  const session = await getAuthSession();

  return (
    <div className={`relative space-y-6`}>
      <HomeFeedToggle />
        {/* @ts-expect-error Server Component */}
        <GeneralFeed />
      </div>
  );
}
