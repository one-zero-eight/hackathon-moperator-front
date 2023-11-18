// @ts-check

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  cacheStartUrl: true,
  dynamicStartUrl: true,
  dynamicStartUrlRedirect: "/moperator/tasks",
  register: false,
  workboxOptions: {
    skipWaiting: false,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig);
