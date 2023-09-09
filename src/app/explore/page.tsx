import ExploreFeed from '@/components/feeds/ExploreFeed';
import SearchBar from '@/components/ui/SearchBar';

export const metadata = {
  title: 'Explore / Z',
  description: '',
  openGraph: {
    title: 'Explore / Z',
    description: '',
    images: [
      {
        url: '',
        width: 200,
        height: 200,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Explore / Z',
    description: '',
    images: [''],
  },
};

interface ExplorePageProps {}

const ExplorePage = ({}: ExplorePageProps) => {
  return (
    <div className='space-y-6 relative'>
      <SearchBar />
      {/* @ts-expect-error Server Component */}
      <ExploreFeed />
    </div>
  );
};

export default ExplorePage;
