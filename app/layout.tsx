import "./globals.css";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import Provider from "./components/Provider";
import Header from "./components/Header";
import { Toaster } from "sonner";
import Script from "next/script";
import siteMetadata from "./utils/metadata";

const work_san = Work_Sans({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title, // a default is required when creating a template
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }`}
        </Script>
      </head>
      <body className={`mx-4 lg:mx-60  ${work_san.className} dark:bg-dark`}>
        <Provider>
          <Header />

          {children}
          <Toaster />
          <footer className="mt-10">
            <p className="text-center text-gray-600 dark:text-white p-5">
              © {new Date().getFullYear()} drcmind blog
            </p>
          </footer>
        </Provider>
      </body>
    </html>
  );
}
