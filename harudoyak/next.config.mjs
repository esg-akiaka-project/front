// next.config.js
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
  images: {
    domains: ["harudoyak-s3bucket.s3.ap-northeast-2.amazonaws.com"], // 여기에 외부 이미지를 허용할 도메인 추가
    remotePatterns: [
      {
        protocol: "https",
        hostname: "harudoyak-s3bucket.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
    ],
    unoptimized: false,
  },
};

export default withBundleAnalyzer(nextConfig);
