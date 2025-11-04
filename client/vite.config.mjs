import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist", // default is 'dist'
  },
  server: {
    https: {
      key: fs.readFileSync("./certs/app.verafied.tech-key.pem"),
      cert: fs.readFileSync("./certs/app.verafied.tech.pem"),
    },
    host: "0.0.0.0",
  },
});
