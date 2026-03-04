import { Footer, SlidePanel } from "@/components/layout";
import type { Metadata } from "next";
import { metaDescription } from "../../lib/meta";

export const metadata: Metadata = {
  title: {
    absolute: "Rio Edwards | Portfolio",
  },
  description: metaDescription,
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
