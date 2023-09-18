import GeneralFeed from '@/components/feeds/GeneralFeed';
import HomeFeedToggle from '@/components/ui/HomeFeedToggle';
import { getAuthSession } from '@/lib/auth';

export default async function HomePage() {
  const session = await getAuthSession();

  return (
    <div className={`${session && 'space-y-6'} relative`}>
      {session && <HomeFeedToggle />}
      {/* @ts-expect-error Server Component */}
      <GeneralFeed />
    </div>
  );
}
