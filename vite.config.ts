import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use VITE_APP_BASE env var for base path, default to "/"
  base: process.env.VITE_APP_BASE || "/",
  server: {
    host: "::",
    port: 8080,
    headers: {
      "Content-Security-Policy": "default-src * data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self' https://*.lovableproject.com https://*.lovable.app;",
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Prevent "Invalid hook call" / hooks dispatcher null by ensuring a single React instance
    dedupe: ["react", "react-dom"],
  },
}));
