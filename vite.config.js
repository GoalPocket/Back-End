import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: "./src/server.js",
      exportName: "app",
      tsCompiler: "esbuild",
    }),
  ],
  optimizeDeps: {
    exclude: ["@prisma/client"],
  },
  build: {
    target: "esnext",
    outDir: "dist",
    assetsDir: "public",
    emptyOutDir: true,
  },
});
