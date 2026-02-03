import { Footer } from "@/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work | Rio Edwards",
  description: "Projects and work by Rio Edwards",
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
