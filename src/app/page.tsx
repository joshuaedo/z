import HomeFeedToggle from '@/components/ui/HomeFeedToggle';
import { getAuthSession } from '@/lib/auth';
import ForYouFeed from '@/components/feeds/for-you/ForYouFeed';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function HomePage() {
  const session = await getAuthSession();

  return (
    <div className={`${session && 'space-y-6'} relative`}>
      {session && <HomeFeedToggle />}
      {/* @ts-expect-error Server Component */}
      <ForYouFeed />
    </div>
  );
}
