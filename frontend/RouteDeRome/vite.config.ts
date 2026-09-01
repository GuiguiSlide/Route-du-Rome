import { defineConfig } from 'vite'

// Configuration Vite optimisée pour une Progressive Web App
export default defineConfig({
  // Options de base
  base: '/',

  // Configuration du serveur de développement
  server: {
    // Activer HTTPS pour tester les Service Workers en développement
    // https: true,
    port: 5173,
    strictPort: false,
    // Permettre l'accès depuis d'autres machines du réseau
    host: true,
  },

  // Configuration du preview (serveur de build local)
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
  },

  // Configuration de la build
  build: {
    // Répertoire de sortie
    outDir: 'dist',
    // Rapport de taille de build
    reportCompressedSize: true,
    // Optimisations
    minify: 'terser',
    // Sourcemaps pour le debugging en production
    sourcemap: false,
    // Chunks splitting
    rollupOptions: {
      output: {
        // Forcer un seul chunk pour les petites applications
        // Comment cette ligne si l'app devient plus grande
        // inlineDynamicImports: true,
      }
    }
  },

  // Optimisations pour le développement
  optimizeDeps: {
    include: ['leaflet']
  }
})
