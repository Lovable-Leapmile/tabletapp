import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load all env variables
  const env = loadEnv(mode, process.cwd(), '');
  
  // Get the base URL with fallback
  const baseUrl = env.LEAPMILE_HOST_BASEURL || 'https://sudarshan.leapmile.com';

  return {
    base: env.VITE_APP_BASE || '/dhlapp/',
    define: {
      // This will be inlined during build
      'import.meta.env.VITE_BASE_URL': JSON.stringify(baseUrl)
    },
    server: {
      host: '::',
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger()
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
