import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    // 8080 bleibt die Vorgabe für `npm run dev` von Hand. Läuft dort schon
    // etwas – etwa eine zweite Vorschau derselben Seite aus einem anderen
    // Zweig –, kann die Umgebung über PORT einen freien Port vorgeben,
    // statt am belegten zu scheitern.
    port: Number(process.env.PORT) || 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Die Bibliotheken ändern sich viel seltener als der Seiteninhalt –
        // getrennt ausgeliefert bleiben sie über Deploys hinweg im Cache.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
}));
