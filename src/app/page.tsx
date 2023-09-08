import ForYouFeed from '@/components/feeds/ForYouFeed';
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
    <>
      <div className='relative'>
        {session ? (
          <>
            <HomeFeedToggle />
            <div className='pt-6'>
              {/* @ts-expect-error */}
              <ForYouFeed />
            </div>
          </>
        ) : (
          // @ts-expect-error
          <GeneralFeed />
        )}
      </div>
    </>
  );
}
