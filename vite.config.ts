import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    base: "/steady-hand-aid/",  // 👈 GitHub Pages repo name
    server: {
      host: "::",        // allow network access
      port: 8080,        // dev server port
      strictPort: true,  // fail if port is busy
    },
    plugins: [
      react(),
      isDev ? componentTagger() : undefined  // only in dev mode
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // shorthand for src
      },
    },
    build: {
      outDir: "dist",       // production build folder
      emptyOutDir: true,    // clean previous build
      sourcemap: false,     // optional
    },
    optimizeDeps: {
      include: ["react", "react-dom"], // speed up dev
    },
  };
});
