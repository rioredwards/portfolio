import { Footer, SlidePanel } from "@/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Rio Edwards | Portfolio",
  },
  description:
    "Software engineer specializing in full-stack web development. View my projects, experience, and get in touch.",
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
