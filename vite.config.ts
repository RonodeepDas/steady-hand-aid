import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    // Base URL for GitHub Pages (repo name)
    base: "/steady-hand-aid/",
    
    // Dev server configuration
    server: {
      host: "::",        // listen on all network interfaces
      port: 8080,        // dev server port
      strictPort: true,  // fail if port is busy
    },

    // Plugins
    plugins: [
      react(),               // React SWC plugin
      isDev && componentTagger()  // Only use in development
    ].filter(Boolean),

    // Path aliasing
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), // shorthand for src
      },
    },

    // Build configuration
    build: {
      outDir: "dist",       // output folder
      sourcemap: isDev,     // generate sourcemaps in dev
      emptyOutDir: true,    // clear previous build
    },

    // Optional: optimize dependencies
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
  };
});
