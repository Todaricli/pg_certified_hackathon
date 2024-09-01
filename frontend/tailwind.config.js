module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure Tailwind processes all your JS/JSX/TS/TSX files in the src directory
  ],
  theme: {
    extend: {
      colors: {
        customYellow: '#FFD53D',
      },
    },
  },
  plugins: [],
};
