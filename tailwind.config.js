/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // Agregamos esta línea para que detecte tu carpeta de componentes
  ],
  theme: {
    extend: {
      fontFamily: {
        antonio: ["var(--font-antonio)"],
        inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
