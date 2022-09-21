/** @type {import('next').NextConfig} */
const nextConfig = {
        reactStrictMode: true,
        swcMinify: true,
        images: {
            domains: ["res.cloudinary.com"],
        },
    }
    // const withBundleAnalyzer = require("@next/bundle-analyzer")({
    //     enabled: process.env.ANALYZE === "true",
    // })
module.exports = nextConfig
    // module.exports = withBundleAnalyzer(nextConfig)