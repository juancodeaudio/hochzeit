import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  sassOptions: {
    additionalData: `@use "app/sass/abstracts" as *;`,
  },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
