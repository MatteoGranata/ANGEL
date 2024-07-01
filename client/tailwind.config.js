/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1436px",
      "3xl": "1736px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        snow: "#ECEFED",
        ivory: "#FAF4E7",
        ghost: "#F8F8FF",
        smoke: "#F5F5F5",
        babypowder: "#F5FAF9",
        offwhite: "#FAF9F6",
        alabaster: "#EDEAE0",
        peppermint: "#ECFAEE",
      },
      dropShadow: {
        "3xl": "0 0 15px rgb(0 0 0 / 0.1)",
      },
      boxShadow: {
        "3xl": "0 0 6px 2px rgb(0 0 0 / 0.15)",
      },
    },
  },
  plugins: [],
};
