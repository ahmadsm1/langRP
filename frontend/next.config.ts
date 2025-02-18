import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config({ path: '../.env' });

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    // Add your environment variables here
    LOCAL: process.env.LOCAL,
  },
};

export default nextConfig;
