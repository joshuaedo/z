import FollowingFeed from '@/components/feeds/FollowingFeed';
import HomeFeedToggle from '@/components/ui/HomeFeedToggle';
import { getAuthSession } from '@/lib/auth';
import SignInFireWall from '@/components/auth/SignInFireWall';

export default async function HomePage() {
  const session = await getAuthSession();

  return (
    <div className={`relative`}>
      {session ? (
        <>
          <HomeFeedToggle />
          <div className={`${session && 'pt-6'}`}>
            {/* @ts-expect-error Server Component */}
            <FollowingFeed />
          </div>
        </>
      ) : (
        <SignInFireWall />
      )}
    </div>
  );
}
