import Header from "@/components/Header";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/Toaster";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

export const metadata = {
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

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter.className
      )}
    >
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Header />
          {/* Aside */}
          {modal}
          <main className="container max-w-7xl mx-auto h-full pt-12">
            {children}
          </main>
          <Toaster />
          {/* MobileNav */}
        </Providers>
      </body>
    </html>
  );
}
