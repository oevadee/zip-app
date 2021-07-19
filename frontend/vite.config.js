import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    port: 3000,
    proxy: {
      "/static": {
        target: `${VITE_API_HOST_V2}/`,
        changeOrigin: true,
      },
      "/api": {
        target: `${VITE_API_HOST_V2}/`,
        changeOrigin: true,
      },
    },
  },
});
