const ContentSecurityPolicy = `
  default-src 'self';
  connect-src 'self' api.airtable.com stats.g.doubleclick.net res.cloudinary.com accounts.spotify.com api.spotify.com *.posthog.com;
  script-src 'self' 'unsafe-inline' 'unsafe-eval' *.posthog.com;
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  frame-src 'self' cloudinary.com;
  img-src 'self' blob: data: https:;
  frame-ancestors 'none';
  font-src 'self' data: fonts.gstatic.com;
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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "openviewpartners.com",
      },
      {
        protocol: "https",
        hostname: "nu.aeon.co",
      },
      {
        protocol: "https",
        hostname: "media.giphy.com",
      },
    ],
  },
};
