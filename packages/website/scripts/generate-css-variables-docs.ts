import { promises as fs } from 'fs';
import { getUISourcePath } from '../src/components/component-utils/get-ui-source-path';
import path from 'node:path';
import { glob } from 'glob';
import { CSSVariableData } from '@site/src/types';
import { getCSSVariableData } from './css-utils';

const OUTPUT_FILE_PATH = path.join(
  process.cwd(),
  'generated',
  'css-variables.json',
);

async function main() {
  const srcPath = getUISourcePath();
  await processCssFiles(srcPath);
}

async function processCssFiles(srcPath: string) {
  const cssFiles = (await glob(path.join(srcPath, '**', '*.css'), {
    windowsPathsNoEscape: true,
  })) as string[];
  const variables: Record<string, CSSVariableData[]> = {};

  for (const cssPath of cssFiles) {
    const uiPath = path.relative(srcPath, cssPath).split(path.sep).join('/');
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
  const outputDir = path.dirname(outputFilePath);
  await fs.mkdir(outputDir, { recursive: true });

  await fs.writeFile(outputFilePath, JSON.stringify(variables, null, 2));

  console.log(
    `Public CSS variables data have been successfully written to ${outputFilePath}`,
  );
}

main();
