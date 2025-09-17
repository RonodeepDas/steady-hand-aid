import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    base: "/steady-hand-aid/", // GitHub Pages repo name
    server: {
      host: "::",
      port: 8080,
      strictPort: true,
    },
    plugins: [
      react(),
      isDev ? componentTagger() : undefined, // only in dev mode
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      outDir: "dist", // production folder
      emptyOutDir: true,
      sourcemap: false,
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
  };
});
