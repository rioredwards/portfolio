import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // Plugins can be added here for webpack builds
  // Note: remarkGfm doesn't work with Turbopack
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
