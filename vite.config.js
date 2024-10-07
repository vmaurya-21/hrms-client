import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "regenerator-runtime/runtime.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  ],
   server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5858',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview : {
   port : 3000,
   },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTest.js"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
