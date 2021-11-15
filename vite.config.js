import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
// const pathSrc = path.resolve(__dirname, "src");
export const baseURL = process.env.NODE_ENV === 'production'? 'https://ingridkao.github.io/taiwan_tourist/': '/'

// https://vitejs.dev/config/
export default defineConfig({
  base: baseURL,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: { additionalData: `@import "${pathSrc}/scss/variables";` },
  //   },
  // },
})
