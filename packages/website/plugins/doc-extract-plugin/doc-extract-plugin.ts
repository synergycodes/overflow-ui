import type { Plugin } from '@docusaurus/types';
import { generateDocs } from '../../scripts/generate-docs/generate-docs';
import path from 'node:path';
import { pluginLogger } from '../plugin-logger';

export default function () {
  return {
    name: 'doc-extract-plugin',
    loadContent: async () => {
      await generateDocs();

      pluginLogger.taskSuccess('Generating docs');
    },
    getPathsToWatch: () => {
      const uiPath = path.resolve('..', 'ui');
      return [`${uiPath}/**/*.{ts,tsx,md}`];
    },
  } satisfies Plugin;
}
