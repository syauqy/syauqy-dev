const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
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
          tailwind: "#09B6D4",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
