const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          netlify: "#3BB2BB",
          chakra: "#319795",
          jala: "#0092ff",
          supabase: "#65d9a5",
          tailwind: "#09b6d4",
          linkedin: "#0d65c3",
          twitter: "#1c91da",
          pocket: "#EE4056",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              "text-decoration": "none",
              "font-weight": 400,
            },
            "h2,h3,h4": {
              "scroll-margin-top": defaultTheme.spacing[32],
            },
            code: { color: theme("colors.pink.500") },
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
  corePlugins: {
    // ...
    textDecoration: false,
  },
};
