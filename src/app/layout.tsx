import Aside from "@/components/layout/Aside";
import Header from "@/components/layout/Header";
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
      <body className="min-h-screen bg-slate-50 antialiased">
        <Providers>
          <Header />
          {modal}
          <main className="container max-w-5xl mx-auto h-full py-4">

          {/* Desktop Page */}
          <div className="hidden md:grid grid-cols-3 gap-y-4 gap-x-4">
            <div className="col-span-1 h-full relative">
              {/* @ts-expect-error Server Component */}
              <Aside />
            </div>
            {children}
          </div>

          {/* Mobile Page */}
          <div className="block md:hidden gap-y-4 relative">
            {children}
          </div>
          
          </main>
          <Toaster />
          {/* MobileNav */}
        </Providers>
      </body>
    </html>
  );
}
