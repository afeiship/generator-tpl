import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/*.ts'],
  format: ['cjs', 'esm' /*'iife' */],
  // globalName: 'i18nHelper',
  dts: true,
  external: ['react', 'react-router-dom'],
  sourcemap: true,
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
});
