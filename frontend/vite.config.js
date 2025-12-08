import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss("./tailwind.config.js")],
  build: {
    chunkSizeWarningLimit: 1500, // size in kB (default is 500)
  },
});
