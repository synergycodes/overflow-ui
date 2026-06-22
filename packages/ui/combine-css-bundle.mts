import fs from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';

/**
 * Post-build CSS steps for the multi-entry library bundle. See css-layers.md.
 *
 * - emits `index.css` (all component styles, prefixed with the @layer order)
 *   and `styles.css` (the global layer order, reset and typography);
 * - emits an `overflow-ui.js` shim re-exporting the renamed `index.js` entry.
 *
 * Per-component stylesheets do not carry the @layer declaration; consumers
 * establish the order by importing `styles.css` first (or the barrel).
 */
export function combineCssBundle(rootDir: string): Plugin {
  const distDir = resolve(rootDir, 'dist');
  const stylesDir = resolve(rootDir, 'src/styles');

  return {
    name: 'overflow-ui:combine-css-bundle',
    apply: 'build',
    closeBundle() {
      writeCombinedStylesheet(distDir, stylesDir);
      writeGlobalStylesheet(distDir, stylesDir);
      writeLegacyEntryShim(distDir);
    },
  };
}

function readLayerOrder(stylesDir: string): string {
  return fs.readFileSync(resolve(stylesDir, 'layers.css'), 'utf-8').trim();
}

function writeCombinedStylesheet(distDir: string, stylesDir: string) {
  const assetsDir = resolve(distDir, 'assets');
  if (!fs.existsSync(assetsDir)) return;

  const styles = fs
    .readdirSync(assetsDir)
    .filter((file) => file.endsWith('.css'))
    .sort()
    .map((file) => fs.readFileSync(resolve(assetsDir, file), 'utf-8'))
    .join('\n');

  // index.css is consumed standalone, so it declares the @layer order itself.
  const combined = `${readLayerOrder(stylesDir)}\n${styles}`;
  fs.writeFileSync(resolve(distDir, 'index.css'), combined);
}

function writeGlobalStylesheet(distDir: string, stylesDir: string) {
  const globals = ['layers.css', 'globals.css', 'typography.css']
    .map((file) => fs.readFileSync(resolve(stylesDir, file), 'utf-8'))
    .join('\n');

  fs.writeFileSync(resolve(distDir, 'styles.css'), globals);
}

function writeLegacyEntryShim(distDir: string) {
  fs.writeFileSync(
    resolve(distDir, 'overflow-ui.js'),
    `export * from './index.js';\n`,
  );
  fs.writeFileSync(
    resolve(distDir, 'overflow-ui.d.ts'),
    `export * from './index';\n`,
  );
}
