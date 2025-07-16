import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
        screens: {
            '2xl': '1300px',
            '3xl': '1920px',
          },
          fontFamily: {
            sans: ['Lato', 'sans-serif'],
          },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes:{
        light:{
            colors:{
                secondary:{
                    DEFAULT: '#34a0af',
                    "100": '#f0f9fa',
                    "200": '#c1e3e8',
                    "300": '#92ccd5',
                    "400": '#63b6c2',
                    "500": '#34a0af',
                    "600": '#2a828d',
                    "700": '#1f616a',
                    "800": '#153f47',
                    "900": '#0a1f23',
                    foreground: '#f0f9fa'
                }
            }
        },
        dark:{
            colors:{
                secondary:{
                    DEFAULT: '#34a0af',
                    "100": '#f0f9fa',
                    "200": '#c1e3e8',
                    "300": '#92ccd5',
                    "400": '#63b6c2',
                    "500": '#34a0af',
                    "600": '#2a828d',
                    "700": '#1f616a',
                    "800": '#153f47',
                    "900": '#0a1f23',
                    foreground: '#f0f9fa'
                }
            }
        }
    }
  })]
}
