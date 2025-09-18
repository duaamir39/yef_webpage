// postcss.config.mjs
import tailwind from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

const isSanity = process.argv.some(arg => arg.includes("sanity")) 
  || process.env.SANITY_STUDIO_BUILD === "true";

/** @type {import('postcss-load-config').Config} */
export default {
  plugins: isSanity
    ? [tailwind(), autoprefixer()]   // For Sanity Studio
    : ["@tailwindcss/postcss"],      // For Next.js
};
