import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json" with { type: 'json' };

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        devtools: "public/devtools.html",
        panel: "public/panel.html",
      },
    },
  },
});
