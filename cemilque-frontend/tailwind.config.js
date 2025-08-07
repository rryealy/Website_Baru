/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT.js";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cemilque: {
          DEFAULT: "#5CE65C",
          secondary: "#21C621",
          hover: "#94ED94",
        },
        button: {
          light: "#dadada",
          dark: "#333333",
        },
      },
    },
  },
  plugins: [],
});
