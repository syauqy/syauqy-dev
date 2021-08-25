const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  frame-src 'self' cloudinary.com;
  img-src 'self' blob: data: https:;
  frame-ancestors 'none';
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

module.exports = {
  // experimental: { esmExternals: true },
  // https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
  reactStrictMode: true,
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    deviceSizes: [420, 640, 750, 828, 1080],
    // domains: ["res.cloudinary.com"],
    // loader: "cloudinary",
    // path: "https://res.cloudinary.com/hajiudin/image/fetch/",
    imageSizes: [300, 400, 640],
    domains: [
      "i.scdn.co",
      "openviewpartners.com",
      "nu.aeon.co",
      "media.giphy.com",
    ],
  },
  i18n: {
    defaultLocale: "en-US",
    locales: ["en-US", "id"],
  },
};
