import fs from 'node:fs';
import path from 'node:path';
import type { PluginCreator } from 'postcss';

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
    console.log('');
    console.log('🌘 Shadow DOM plugin is active.');
    console.log(' - To force refresh styles run: pnpm clear (before)');
    console.log('');
    didAnnounceBeingAdded = true;
  }

  if (!fs.existsSync(outputFile)) {
    fs.writeFileSync(
      outputFile,
      `/* Mocked file run: pnpm prepare before running server to regenerate */`,
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
        console.log('');
        console.log(
          '🌘 Shadow DOM plugin is preparing styles for the Shadow DOM.',
        );

        console.log(
          ` - extracting: ${root.source.input.file.replace(path.resolve(__dirname, '../../../..'), '')}`,
        );
        console.log('');

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
        ShadowDomCSS({ filesToExtractPatterns: ['axiom/packages/ui'] }),
      );

      return postcssOptions;
    },
  };
}
