import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build to plain HTML/CSS/JS so any static host can serve it with no
  // Node server at runtime. Output goes to ./out
  output: "export",
  // GitHub Pages serves directories, so emit /study/welcome/index.html
  trailingSlash: true,
  // A static host can't run Next's on-demand image optimizer
  images: { unoptimized: true },
};

export default nextConfig;
