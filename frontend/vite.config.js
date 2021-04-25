import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import dotenv from "dotenv";
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: `http://${process.env.VITE_API_HOST}/`,
        changeOrigin: true,
      },
    },
  },
});
