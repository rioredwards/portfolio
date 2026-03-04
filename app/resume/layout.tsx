import { Footer } from "@/components/layout";
import { metaDescription } from "@/lib/meta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: metaDescription,
  openGraph: {
    title: "Rio Edwards | Resume",
    description: metaDescription,
  },
};

export default function ResumeLayout({
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
