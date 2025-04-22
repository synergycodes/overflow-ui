import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { areObjectsEqual } from './utils/object';
import {
  findComponentFiles,
  parseComponents,
  generatePropsData,
} from './services/component-parser';
import { PropsData } from './services/types';

const CONFIG = {
  paths: {
    components: '../../ui/src/components/**/*.tsx',
    generated: '../generated',
    propsFile: 'props.json',
  },
} as const;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generatedDir = join(__dirname, CONFIG.paths.generated);
const propsFile = join(generatedDir, CONFIG.paths.propsFile);

if (!existsSync(generatedDir)) {
  mkdirSync(generatedDir, { recursive: true });
}

const componentFiles = findComponentFiles(__dirname, CONFIG.paths.components);
const components = parseComponents(componentFiles);
const newProps = generatePropsData(components);

let existingProps: PropsData | null = null;
if (existsSync(propsFile)) {
  const existingContent = readFileSync(propsFile, 'utf8');
  try {
    existingProps = JSON.parse(existingContent);
  } catch (error) {
    console.error('Error parsing existing props file:', error);
  }
}

if (existingProps) {
  const sortedExistingProps: PropsData = {};
  Object.keys(existingProps)
    .sort((a, b) => {
      const aName = a.split('/').pop()?.replace('.tsx', '') || '';
      const bName = b.split('/').pop()?.replace('.tsx', '') || '';
      return aName.localeCompare(bName);
    })
    .forEach((key) => {
      sortedExistingProps[key] = existingProps![key];
    });
  existingProps = sortedExistingProps;
}

if (!existingProps || !areObjectsEqual(existingProps, newProps)) {
  if (existingProps) {
    const newKeys = new Set(Object.keys(newProps));
    const existingKeys = new Set(Object.keys(existingProps));

    const addedKeys = [...newKeys].filter((key) => !existingKeys.has(key));
    const removedKeys = [...existingKeys].filter((key) => !newKeys.has(key));

    if (addedKeys.length > 0) {
      console.log('Added components:', addedKeys);
    }
    if (removedKeys.length > 0) {
      console.log('Removed components:', removedKeys);
    }

    for (const key of [...newKeys, ...existingKeys]) {
      if (newProps[key] && existingProps[key]) {
        const newPropsStr = JSON.stringify(newProps[key]);
        const existingPropsStr = JSON.stringify(existingProps[key]);
        if (newPropsStr !== existingPropsStr) {
          console.log(`Props changed for ${key}`);
        }
      }
    }
  }

  writeFileSync(propsFile, JSON.stringify(newProps, null, 2));
  console.log('Props file updated due to API changes');
} else {
  console.log('No API changes detected, props file not updated');
}
