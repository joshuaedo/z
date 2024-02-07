import ForYouFeed from '@/components/feeds/for-you/ForYouFeed';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function HomePage() {
  return (
    <div className={`relative`}>
      {/* @ts-expect-error Server Component */}
      <ForYouFeed />
    </div>
  );
}
