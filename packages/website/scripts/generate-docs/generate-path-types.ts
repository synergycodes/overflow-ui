import { getUISourcePath } from '../../src/components/component-utils/get-ui-source-path';
import { glob } from 'glob';
import { writeFile } from 'node:fs/promises';
import { join, sep } from 'node:path';
import { cwd } from 'node:process';
import { createScript } from '../utils/create-script';

const OUTPUT_FILE = join(cwd(), 'generated', 'path-types.ts');

export const generatePathTypes = createScript(
  'UI Path Types',
  async function () {
    const cssGlob = getUISourcePath('components/**/*.css');
    const cssPaths = await glob(cssGlob, { windowsPathsNoEscape: true });

    const tsxGlob = getUISourcePath('components/**/*.tsx');
    const tsxPaths = await glob(tsxGlob, { windowsPathsNoEscape: true });

    const tsxPathType = pathsToType(tsxPaths);
    const cssPathType = pathsToType(cssPaths);

    const typeDeclaration = `
    export type OverflowUITSXRelativePath = ${tsxPathType};
    export type OverflowUICSSRelativePath = ${cssPathType};
  `;

    await writeFile(OUTPUT_FILE, typeDeclaration);
  },
);

function pathsToType(paths: string[]) {
  return (
    paths
      .toSorted()
      .map((filePath) => {
        const normalizedPath = filePath.split(sep).join('/');
        const srcIndex = normalizedPath.indexOf('ui/src/');
        if (srcIndex === -1) {
          return null;
        }
        const relativePath = normalizedPath.slice(srcIndex + 'ui/src/'.length);

        return `"${relativePath}"`;
      })
      .filter(Boolean)
      .join(' | ') || '""'
  );
}
