import { defineConfig } from 'vite'

  
export default defineConfig({
  build: {
    target: 'esnext' // Allows native Top-Level Await without a plugin
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  }
});
