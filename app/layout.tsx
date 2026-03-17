import {
  HydrationIndicator,
  MobileMenu,
  Navbar,
  Sidebar,
} from "@/components/layout";
import { InterviewBot } from "@/components/interview-bot/InterviewBot";
import { LightboxProvider } from "@/components/lightbox-image";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { DM_Mono, DM_Sans, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { metaDescription } from "../lib/meta";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const mazaeniDemo = localFont({
  src: [
    {
      path: "../fonts/Mazaeni-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Mazaeni-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Mazaeni-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Mazaeni-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Mazaeni-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-mazaeni",
  fallback: ["serif"],
  display: "swap",
});

const siteUrl = "https://rioedwards.com";

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rio Edwards",
  url: siteUrl,
  jobTitle: "Product Engineer",
  description: metaDescription,
  sameAs: [
    "https://github.com/rioredwards",
    "https://linkedin.com/in/rioredwards",
    "https://bsky.app/profile/rioedwards.com",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Rio Edwards | Product Engineer",
    template: "Rio Edwards | %s",
  },
  description: metaDescription,
  keywords: [
    "product engineer",
    "frontend engineer",
    "software engineer",
    "full-stack engineer",
    "developer",
    "web developer",
    "React",
    "Next.js",
    "TypeScript",
    "portfolio",
    "Rio Edwards",
  ],
  authors: [{ name: "Rio Edwards", url: siteUrl }],
  creator: "Rio Edwards",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Rio Edwards",
    title: "Rio Edwards | Product Engineer",
    description: metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rio Edwards | Product Engineer",
    description: metaDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
      </head>
      <body
        className={`${dmSans.variable} ${dmMono.variable} ${mazaeniDemo.variable} ${montserrat.variable} font-sans antialiased`}
      >
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:ring-2 focus:ring-ring focus:outline-none"
        >
          Skip to content
        </a>
        <HydrationIndicator />
        <LightboxProvider>
          <Navbar />
          <Sidebar />
          <MobileMenu />
          {children}
          <Toaster />
          <InterviewBot />
        </LightboxProvider>
        {process.env.VERCEL_ENV && <Analytics />}
        {process.env.VERCEL_ENV && <SpeedInsights />}
      </body>
    </html>
  );
}
