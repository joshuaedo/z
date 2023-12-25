import "@uploadthing/react/styles.css";
import Aside from "@/components/layout/Aside";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import Providers from "@/components/wrappers/Providers";
import { Toaster } from "@/components/ui/Toaster";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { Metadata } from "next";

export const generateMetadata = async ({}): Promise<Metadata> => {
  return {
    title: "Z",
    description:
      "Z, the network of diverse communities where you can explore your passions and interests. Join the conversation.",
    openGraph: {
      title: "Z",
      description: "The Z Network, Join the conversation.",
      url: "https://z.joshuaedo.com",
      siteName: "Z",
      images: [
        {
          url: "https://joshuaedo.sirv.com/Z/Z.png",
          width: 200,
          height: 200,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Z",
      description: "The Z Network, Join the conversation.",
      creator: "Joshua Edo",
      images: ["https://joshuaedo.sirv.com/Z/Z.png"],
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

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-slate-50 dark:bg-[#000000] text-black dark:text-[#E7E9EA] font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <Header />
          {modal}
          <main className="mobile-container md:container max-w-5xl mx-auto h-full pt-24 pb-20 md:pt-8 md:pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-4">
              <div className="hidden md:block col-span-1 h-full relative">
                {/* @ts-expect-error Server Component */}
                <Aside />
              </div>
              <div className="col-span-1 md:col-span-2">{children}</div>
            </div>
          </main>
          <Toaster />
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}
