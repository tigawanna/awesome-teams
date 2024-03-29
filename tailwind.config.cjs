/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",

],
  theme: {
    extend: {
      colors: {
        accent:"var(--accent-color)",
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-animate"),
    require('@tailwindcss/container-queries'),
 
  ],
};
