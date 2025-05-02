import { mkdir, writeFile } from 'node:fs/promises';
import { getUISourcePath } from '../../src/components/component-utils/get-ui-source-path';
import { join, dirname, relative, sep } from 'node:path';
import { glob } from 'glob';
import { CSSVariableData } from '@site/src/types';
import { getCSSVariableData } from '../utils/css';
import { cwd } from 'node:process';
import { toPrettyJson } from '../utils/json';
import { createScript } from '../utils/create-script';

const OUTPUT_FILE_PATH = join(cwd(), 'generated', 'css-variables.json');

export const generateCSSVariables = createScript(
  'CSS Variable Lists',
  async function () {
    const srcPath = getUISourcePath();
    await processCssFiles(srcPath);
  },
);

async function processCssFiles(srcPath: string) {
  const cssFiles = (await glob(join(srcPath, '**', '*.css'), {
    windowsPathsNoEscape: true,
  })) as string[];

  const sortedCssFiles = cssFiles.toSorted();

  const variables: Record<string, CSSVariableData[]> = {};

  for (const cssPath of sortedCssFiles) {
    const uiPath = relative(srcPath, cssPath).split(sep).join('/');
    variables[uiPath] = await extractVariables(cssPath);
  }

  await generateJsonOutput(variables, OUTPUT_FILE_PATH);
}

async function extractVariables(cssPath: string) {
  return getCSSVariableData(cssPath);
}

async function generateJsonOutput(
  variables: Record<string, CSSVariableData[]>,
  outputFilePath: string,
) {
  const outputDir = dirname(outputFilePath);
  await mkdir(outputDir, { recursive: true });

  await writeFile(outputFilePath, toPrettyJson(variables));
}
