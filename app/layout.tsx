import '@/ui/globals.css';
import Header from '@/ui/Header';
import Footer from '@/ui/Footer';
import { Metadata } from 'next';
import { Inter as interFont } from 'next/font/google';
import { MobileHeader } from '@/ui/header/MobileHeader';
import Sidebar from '@/ui/flowbite-sidebar/Sidebar';
import { Example } from '@/ui/framer-header/Example';

export const metadata: Metadata = {
  title: `Rio Edwards | Web Developer`,
  description: `Rio Edwards, a web developer based in the PNW.`,
  keywords:
    'Software, Engineer, Front-End, Back-End, Web, Developer, React, Next.js, TypeScript, JavaScript, CSS, HTML, Node.js, Portland, USA',
};

const inter = interFont({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen">
        {/* <Header /> */}
        {/* <Example /> */}
        <MobileHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
