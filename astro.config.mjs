// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://juriandreiczuk.github.io",
  base: "/3ways",

  vite: {
    plugins: [tailwindcss()],
  },
});
