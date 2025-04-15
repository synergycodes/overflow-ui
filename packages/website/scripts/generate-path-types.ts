import { getUISourcePath } from '../src/components/component-utils/get-ui-source-path';
import { glob } from 'glob';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUTPUT_FILE = path.join(process.cwd(), 'generated', 'path-types.ts');

export async function generatePathTypes() {
  const cssGlob = getUISourcePath('components/**/*.css');
  const cssPaths = await glob(cssGlob, { windowsPathsNoEscape: true });

  const tsxGlob = getUISourcePath('components/**/*.tsx');
  const tsxPaths = await glob(tsxGlob, { windowsPathsNoEscape: true });

  const tsxPathType = pathsToType(tsxPaths);
  const cssPathType = pathsToType(cssPaths);

  const typeDeclaration = `
    export type AxiomTSXRelativePath = ${tsxPathType};
    export type AxiomCSSRelativePath = ${cssPathType};
  `;

  await writeFile(OUTPUT_FILE, typeDeclaration);
}

function pathsToType(paths: string[]) {
  return (
    paths
      .map((filePath) => {
        const normalizedPath = filePath.split(path.sep).join('/');
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

generatePathTypes();
