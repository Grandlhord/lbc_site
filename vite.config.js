import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Output directory for build
    assetsDir: "assets", // Directory for static assets
    chunkSizeWarningLimit: 1000, // Suppress large chunk warnings
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // Separate vendor libraries for better caching
        },
      },
    },
  },
});
