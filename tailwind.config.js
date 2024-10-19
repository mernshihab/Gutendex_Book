/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#017270",
        secondary: "#004090",
        "neutral-content": "#757872",
      },
    },
  },
  plugins: [],
};
