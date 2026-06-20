import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#121212",
        cream: "#f7f6f2",
        lime: "#d9ff57",
      },
      boxShadow: {
        soft: "0 16px 50px rgba(22, 22, 20, 0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
