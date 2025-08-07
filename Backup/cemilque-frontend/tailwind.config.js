/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors : {
        cemilque: {
          DEFAULT : "#5CE65C",
          secondary : "#21C621",
          hover : "#94ED94"
        },
        button : {
          light : "#dadada",
          dark : "#333333",
        }
      },
    },
  },
  plugins: [],
}

