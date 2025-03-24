import { getUISourcePath } from '../src/components/component-utils/get-ui-source-path';
import { glob } from 'glob';
import { writeFile } from 'node:fs/promises';

const OUTPUT_FILE = './generated/path-types.ts';

export async function generatePathTypes() {
  const cssGlob = getUISourcePath('components/**/*.css');
  const cssPaths = await glob(cssGlob);

  const tsxGlob = getUISourcePath('components/**/*.tsx');
  const tsxPaths = await glob(tsxGlob);

  const tsxPathType = pathsToType(tsxPaths);
  const cssPathType = pathsToType(cssPaths);

  const typeDeclaration = `
    export type AxiomTSXRelativePath = ${tsxPathType};
    export type AxiomCSSRelativePath = ${cssPathType};
  `;

  writeFile(OUTPUT_FILE, typeDeclaration);
}

function pathsToType(paths: string[]) {
  return paths
    .map((path) => {
      const [_, relativePath] = path.split('ui/src/');
      return `"${relativePath}"`;
    })
    .join(' | ');
}

generatePathTypes();
