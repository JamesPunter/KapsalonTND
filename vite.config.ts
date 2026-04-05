import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import yaml from "@modyfi/vite-plugin-yaml";

export default defineConfig(({ command }) => ({
  // Default to root path (Netlify). Override for project-subpath deploys (e.g. GitHub Pages).
  base: command === "build" ? process.env.VITE_BASE_PATH ?? "/" : "/",
  plugins: [react(), tailwindcss(), yaml()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
