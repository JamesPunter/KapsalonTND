import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import yaml from "@modyfi/vite-plugin-yaml";

export default defineConfig(({ command }) => ({
  // Netlify (and most hosts): leave VITE_BASE_PATH unset → base "/".
  // GitHub Pages project site: set VITE_BASE_PATH (see .github/workflows/deploy-pages.yml).
  base: command === "build" ? process.env.VITE_BASE_PATH ?? "/" : "/",
  plugins: [react(), tailwindcss(), yaml()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
