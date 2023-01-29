/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ...Object.fromEntries(
      Object.keys(process.env)
        .filter(k => k.includes('_APP_'))
        .map(k => [[k], process.env[k]])
    ),
  }
}

module.exports = nextConfig
