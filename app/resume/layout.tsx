import { Footer } from "@/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Rio Edwards",
  description: "Rio Edwards' resume",
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
