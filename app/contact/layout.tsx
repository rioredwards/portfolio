import { Footer } from "@/components/layout";
import { metaDescription } from "@/lib/meta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: metaDescription,
  openGraph: {
    title: "Rio Edwards | Contact",
    description: metaDescription,
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
