import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: `http://localhost`,
        changeOrigin: true,
      },
    },
  },
});
