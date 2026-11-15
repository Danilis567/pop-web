import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, '/');
          if (
            normalized.includes('/node_modules/react/') ||
            normalized.includes('/node_modules/react-dom/') ||
            normalized.includes('/node_modules/react-router-dom/') ||
            normalized.includes('/node_modules/react-router/') ||
            normalized.includes('/node_modules/scheduler/')
          ) {
            return 'react-vendor';
          }
          if (normalized.includes('/node_modules/@radix-ui/')) {
            return 'radix-ui';
          }
        },
      },
    },
  },
});
