import fs from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';
import { boxSizingPlugin } from './postcss-box-sizing.mts';

function combineCssBundle(): Plugin {
  return {
    name: 'overflow-ui:combine-css-bundle',
    apply: 'build',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist');
      const assetsDir = resolve(distDir, 'assets');
      if (fs.existsSync(assetsDir)) {
        const cssFiles = fs
          .readdirSync(assetsDir)
          .filter((f) => f.endsWith('.css'))
          .sort();
        const combined = cssFiles
          .map((f) => fs.readFileSync(resolve(assetsDir, f), 'utf-8'))
          .join('\n');
        fs.writeFileSync(resolve(distDir, 'index.css'), combined);
      }
      // Backwards-compat shim for consumers that hard-coded the old
      // single-bundle filename (e.g. workflow-builder's LOCAL_OVERFLOW_UI
      // dev alias).
      fs.writeFileSync(
        resolve(distDir, 'overflow-ui.js'),
        `export * from './index.js';\n`,
      );
      fs.writeFileSync(
        resolve(distDir, 'overflow-ui.d.ts'),
        `export * from './index';\n`,
      );
    },
  };
}

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
      external: (id) => {
        if (id === 'react' || id === 'react-dom' || id === 'react/jsx-runtime') {
          return true;
        }
        if (id === '@base-ui/react' || id.startsWith('@base-ui/react/')) {
          return true;
        }
        if (
          id === '@phosphor-icons/react' ||
          id.startsWith('@phosphor-icons/react/')
        ) {
          return true;
        }
        return false;
      },
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
    combineCssBundle(),
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
