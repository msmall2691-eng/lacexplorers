/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Images are local (SVG + CSS backgrounds) for v1, so no remote patterns are
  // needed. If Meg adds photos hosted elsewhere later, configure images.remotePatterns here.
};

export default nextConfig;
