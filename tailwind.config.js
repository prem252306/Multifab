import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A1F44",
        secondary: "#FF7A00"
      }
    }
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant("gold", ".gold &");
    })
  ]
}