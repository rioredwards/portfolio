import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: `Rio Edwards | Web Developer`,
  description: `Rio Edwards, a web developer based in the PNW.`,
  keywords:
    "Software, Engineer, Front-End, Back-End, Web, Developer, React, Next.js, TypeScript, JavaScript, CSS, HTML, Node.js, Portland, USA",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <section className="min-h-screen">
          <Header />
          <main>{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
