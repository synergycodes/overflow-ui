import fs from 'node:fs';
import path from 'node:path';
import type { PluginCreator } from 'postcss';
import { pluginLogger } from '../plugin-logger';

type ShadowDomCSSOptions = {
  filesToExtractPatterns: string[];
};

let didAnnounceBeingAdded = false;

const ShadowDomCSS: PluginCreator<ShadowDomCSSOptions> = ({
  filesToExtractPatterns,
}) => {
  const outputDir = path.resolve(__dirname, '../../static/css');
  const outputFile = path.join(outputDir, 'shadow-dom-styles.css');
  let stylesToExtract = '';

  if (!didAnnounceBeingAdded) {
    pluginLogger.info(
      '🌘 Shadow DOM plugin is active.\nTo force refresh styles run: pnpm website clear (before)',
    );

    didAnnounceBeingAdded = true;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  if (!fs.existsSync(outputFile)) {
    fs.writeFileSync(
      outputFile,
      '/* Mocked file run: pnpm clear before running server to regenerate */',
      'utf8',
    );
  }

  return {
    postcssPlugin: 'shadow-dom-css',
    Once(root) {
      const inputFile = root.source?.input.file || '';

      const shouldExtract = filesToExtractPatterns.some((namePattern) =>
        inputFile.replaceAll('\\', '/').includes(namePattern),
      );

      if (shouldExtract) {
        pluginLogger.info(
          `🌘 Shadow DOM plugin is preparing styles for the Shadow DOM.\n - extracting: ${root.source.input.file.replace(path.resolve(__dirname, '../../../..'), '')}`,
        );

        const fileContent = fs.existsSync(root.source.input.file)
          ? fs.readFileSync(root.source.input.file, 'utf8')
          : '';

        if (fileContent) {
          stylesToExtract = `${stylesToExtract} ${fileContent}`;

          if (stylesToExtract) {
            fs.writeFileSync(outputFile, stylesToExtract, 'utf8');
          }
        }
      }
    },
  };
};
ShadowDomCSS.postcss = true;

export default function () {
  return {
    name: 'shadow-dom-css-postcss',
    configurePostCss(postcssOptions) {
      postcssOptions.plugins.push(
        ShadowDomCSS({
          filesToExtractPatterns: ['axiom/packages/ui', '@xyflow'],
        }),
      );

      return postcssOptions;
    },
  };
}
