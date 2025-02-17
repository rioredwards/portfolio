import Footer from '@/ui/Footer';
import '@/ui/globals.css';
import Header from '@/ui/header/Header';
import UnderConstruction from '@/ui/UnderConstruction';
import { Metadata } from 'next';
import { Inter as interFont } from 'next/font/google';

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

export default function RootLayout(props: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen">
        <Header />
        {props.modal}
        {/* <main>{props.children}</main> */}
        <UnderConstruction />
        <Footer />
      </body>
    </html>
  );
}
