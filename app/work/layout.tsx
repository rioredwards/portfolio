import { Footer } from "@/components/layout";
import { metaDescription } from "@/lib/meta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work | Rio Edwards",
  description: metaDescription,
};

export default function WorkLayout({
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
