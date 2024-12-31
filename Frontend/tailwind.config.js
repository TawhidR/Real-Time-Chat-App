import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure the correct paths to your files
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // This will allow DaisyUI components to work
}
