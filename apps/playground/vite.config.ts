import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/chop-shop/',
  // @ts-expect-error - pre-existing monorepo type mismatch
  plugins: [react(), tailwindcss()],
});
