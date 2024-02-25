import '@/styles/globals.css';
import '@uploadthing/react/styles.css';
import Providers from '@/providers';
import { cn } from '@/lib/utils';
import { Inter as FontSans } from 'next/font/google';
import { Metadata } from 'next';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from './api/uploadthing/core';
import LayoutClient from '@/components/layout/LayoutClient';

export const generateMetadata = async ({}): Promise<Metadata> => {
  return {
    title: 'Z',
    description:
      'Z, the network of diverse communities where you can explore your passions and interests. Join the conversation.',
    openGraph: {
      title: 'Z',
      description: 'The Z Network, Join the conversation.',
      url: 'https://z.joshuaedo.com',
      siteName: 'Z',
      images: [
        {
          url: 'https://joshuaedo.sirv.com/Z/Z.png',
          width: 200,
          height: 200,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'Z',
      description: 'The Z Network, Join the conversation.',
      creator: 'Joshua Edo',
      images: ['https://joshuaedo.sirv.com/Z/Z.png'],
    },
    robots: {
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
      },
    },
  };
};

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-slate-50 dark:bg-[#000000] text-black dark:text-[#E7E9EA] font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {modal}
          <LayoutClient>{children}</LayoutClient>
        </Providers>
      </body>
    </html>
  );
}
