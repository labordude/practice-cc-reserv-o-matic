import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/customers": {
        target: "http://127.0.0.1:5555",
        changeOrigin: true,
        secure: false,
      },
      "/locations": {
        target: "http://127.0.0.1:5555",
        changeOrigin: true,
        secure: false,
      },
      "/reservations": {
        target: "http://127.0.0.1:5555",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/edit/, ""),
      },
    },
  },
});
