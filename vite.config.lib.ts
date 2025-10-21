import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      "GC-UI-COMPONENTS": path.resolve(import.meta.dirname, "client", "src", "lib", "ui-library"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, "client/src/lib/ui-library/index.ts"),
      name: "GCUIComponents",
      formats: ["es", "cjs"],
      fileName: (format) => `gc-ui-components.${format}.js`,
    },
    rollupOptions: {
      // Solo externalizar peer dependencies (React y React-DOM)
      // Todas las demás dependencias (Radix UI, lucide-react, etc.) se incluyen en el bundle
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
        // Preservar estructura de módulos para mejor tree-shaking
        preserveModules: false,
        exports: "named",
      },
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    // Optimizar para producción
    minify: "esbuild",
    target: "esnext",
  },
});
