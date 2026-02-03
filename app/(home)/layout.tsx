import { Footer, SlidePanel } from "@/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rio Edwards | Portfolio",
  description: "Personal portfolio of Rio Edwards",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <SlidePanel
        orientation="right"
        decorationHeight="tall"
        fill="background"
        previousDecorationHeight="tall"
      >
        <Footer />
      </SlidePanel>
    </>
  );
}
