import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { API_HOST } from "./src/config/index";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: `http://${API_HOST}/api`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
