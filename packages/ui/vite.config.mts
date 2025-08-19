import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Overflow UI',
      fileName: 'overflow-ui',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      // [TODO] Fix: suppress "Module level directives cause errors when bundled" warnings
      onwarn: (warning, warn) => {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      },
      output: {
        globals: {
          'react-dom': 'ReactDom',
          react: 'React',
          'react/jsx-runtime': 'ReactJsxRuntime',
        },
      },
    },
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '@ui': resolve(__dirname, './src'),
    },
  },
  // [TODO]: Preferably we should include just a single .d.ts file, but setting rollupTypes to true doesn't work with current setup
  // Source: https://github.com/qmhc/vite-plugin-dts?tab=readme-ov-file#internal-error-occurs-when-using-rolluptypes-true
  plugins: [
    libInjectCss(),
    dts({
      entryRoot: 'src',
    }),
    viteStaticCopy({
      targets: [
        { src: '../tokens/dist/tokens.css', dest: '.' },
        { src: '../tokens/dist/numerals-mode-1.css', dest: '.' },
        { src: '../tokens/dist/primitives-mode-1.css', dest: '.' },
      ],
    }),
  ],
});
