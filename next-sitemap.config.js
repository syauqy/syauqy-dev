/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://syauqy.dev",
  changefreq: "daily",
  priority: 0.7,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/api/*", "/_next/*", "/blog/*", "/pemuda-setempat", "/blog"],
};
