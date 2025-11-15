/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    turbo: {
      resolveAlias: {
        // Forzar mongoose a no romperse con turbopack
        "whatwg-url": require.resolve("whatwg-url")
      }
    }
  }
};

export default nextConfig;
