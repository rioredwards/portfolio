import '@/ui/globals.css';
import Header from '@/ui/Header';
import Footer from '@/ui/Footer';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
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
