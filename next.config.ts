import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@use "app/sass/abstracts/variables";`,
  },
};

export default nextConfig;
