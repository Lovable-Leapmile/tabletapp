import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Use VITE_APP_BASE env var for base path, default to "/"
    base: env.VITE_APP_BASE || "/",
    define: {
      // Ensure VITE_BASE_URL is available in the client
      'import.meta.env.VITE_BASE_URL': JSON.stringify(env.VITE_BASE_URL || env.LEAPMILE_HOST_BASEURL || '')
    },
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
