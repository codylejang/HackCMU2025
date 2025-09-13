/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["pdf-parse"],
  // Disable the Next.js development indicator (the small "N" logo)
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
};

module.exports = nextConfig;
