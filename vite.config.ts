import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1] || 'NHBN-Portfolio-Website';
const isCI = !!process.env.GITHUB_ACTIONS;

export default defineConfig({
  plugins: [react()],
  base: isCI ? `/${repoName}/` : './',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
});
