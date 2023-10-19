import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: {
          DEFAULT: "#181A2A",
          50: "#eaeaea",
          100: "#d5d5d5",
          200: "#acacac",
          300: "#838383",
          400: "#5a5a5a",
          500: "#313131",
          600: "#1e1e1e",
          700: "#242535",
          800: "#181A2A",
          900: "#181A2A",
        },
      },
      backgroundColor: {
        dark: {
          DEFAULT: "#181A2A",
          50: "#eaeaea",
          100: "#d5d5d5",
          200: "#acacac",
          300: "#838383",
          400: "#5a5a5a",
          500: "#313131",
          600: "#1e1e1e",
          700: "#242535",
          800: "#181A2A",
          900: "#181A2A",
        },
      },
    },
  },
  plugins: [],
};
export default config;
