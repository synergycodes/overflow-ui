import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';
import { boxSizingPlugin } from './postcss-box-sizing.mts';
import { combineCssBundle } from './combine-css-bundle.mts';

const rootDir = dirname(fileURLToPath(import.meta.url));

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

const externalPackages = ['@base-ui/react', 'react-textarea-autosize'];
const externalModules = ['react', 'react-dom', 'react/jsx-runtime'];

function getEntries(): Record<string, string> {
  const entries: Record<string, string> = {
    index: resolve(rootDir, 'src/index.ts'),
  };
  for (const name of componentEntries) {
    entries[name] = resolve(rootDir, `src/components/${name}/index.ts`);
  }
  return entries;
}

function isExternal(id: string): boolean {
  if (externalModules.includes(id)) return true;
  return externalPackages.some((pkg) => id === pkg || id.startsWith(`${pkg}/`));
}

function copyTokenStyles() {
  const files = ['tokens.css', 'numerals-mode-1.css', 'primitives-mode-1.css'];
  return viteStaticCopy({
    targets: files.map((file) => ({
      src: `../tokens/dist/${file}`,
      dest: '.',
    })),
  });
}

function bundleStatsPlugins() {
  return [
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
  ];
}

export default defineConfig({
  build: {
    lib: {
      entry: getEntries(),
      name: 'Overflow UI',
      formats: ['es'],
    },
    rollupOptions: {
      external: isExternal,
      onwarn: (warning, warn) => {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
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
      '@ui': resolve(rootDir, './src'),
    },
  },
  plugins: [
    libInjectCss(),
    // Per-entry .d.ts; rollupTypes is intentionally off (incompatible with this
    // multi-entry setup, see vite-plugin-dts docs).
    dts({ entryRoot: 'src' }),
    copyTokenStyles(),
    combineCssBundle(rootDir),
    ...(process.env.BUNDLE_STATS ? bundleStatsPlugins() : []),
  ],
});
