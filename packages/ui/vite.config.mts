import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';
import { boxSizingPlugin } from './postcss-box-sizing.mts';

const __dirname = dirname(fileURLToPath(import.meta.url));

const componentEntries = [
  'accordion',
  'avatar',
  'button',
  'checkbox',
  'collapsible',
  'date-picker',
  'edge',
  'input',
  'menu',
  'modal',
  'node',
  'radio-button',
  'segment-picker',
  'select',
  'separator',
  'snackbar',
  'status',
  'switch',
  'text-area',
  'tooltip',
] as const;

const entry: Record<string, string> = {
  index: resolve(__dirname, 'src/index.ts'),
};
for (const name of componentEntries) {
  entry[name] = resolve(__dirname, `src/components/${name}/index.ts`);
}

export default defineConfig({
  build: {
    lib: {
      entry,
      name: 'Overflow UI',
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
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name][extname]',
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
    postcss: {
      plugins: [boxSizingPlugin()],
    },
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
    ...(process.env.BUNDLE_STATS
      ? [
          visualizer({
            filename: 'dist/bundle-stats.html',
            template: 'treemap',
            gzipSize: true,
            brotliSize: true,
          }),
          visualizer({
            filename: 'dist/bundle-stats.json',
            json: true,
            gzipSize: true,
            brotliSize: true,
          }),
        ]
      : []),
  ],
});
