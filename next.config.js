module.exports = {
  // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  reactStrictMode: true,
  images: {
    deviceSizes: [420, 640, 750, 828, 1080],
    // domains: ["res.cloudinary.com"],
    // loader: "cloudinary",
    // path: "https://res.cloudinary.com/hajiudin/image/fetch/",
    imageSizes: [240, 380, 640],
    domains: ["i.scdn.co", "openviewpartners.com", "nu.aeon.co"],
  },
  i18n: {
    defaultLocale: "en-US",
    locales: ["en-US", "id"],
  },
};
