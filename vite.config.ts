import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default defineConfig({
  plugins: [
  tailwindcss(),
  tanstackStart({
    server: { entry: "server" },
  }),
  react(),
],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
