import type { Plugin } from '@docusaurus/types';
import { generateDocs } from '../../scripts/generate-docs/generate-docs';
import path from 'node:path';

export default function () {
  return {
    name: 'doc-extract-plugin',
    loadContent: async () => {
      return generateDocs();
    },
    getPathsToWatch: () => {
      const uiPath = path.resolve('..', 'ui');
      return [`${uiPath}/**/*.{ts,tsx,md}`];
    },
  } satisfies Plugin;
}
