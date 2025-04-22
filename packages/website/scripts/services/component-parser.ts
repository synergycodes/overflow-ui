import { parse } from 'react-docgen-typescript';
import { glob } from 'glob';
import { Component, PropsData } from './types';
import { PARSER_OPTIONS, ERROR_MESSAGES } from './config';

export function findComponentFiles(cwd: string, pattern: string): string[] {
  try {
    return glob.sync(pattern, {
      cwd,
      absolute: true,
    });
  } catch (error) {
    console.error('Error finding component files:', error);
    return [];
  }
}

function isValidComponent(component: unknown): component is Component {
  return (
    typeof component === 'object' &&
    component !== null &&
    'displayName' in component &&
    'filePath' in component &&
    'description' in component &&
    'props' in component
  );
}

export function parseComponents(files: string[]): Component[] {
  try {
    const parsedComponents = parse(files, PARSER_OPTIONS);
    return parsedComponents.filter(isValidComponent).filter((component) => {
      if (!component.displayName) {
        console.warn(ERROR_MESSAGES.MISSING_DISPLAY_NAME, component.filePath);
        return false;
      }
      return true;
    });
  } catch (error) {
    console.error(ERROR_MESSAGES.PARSING_ERROR, error);
    return [];
  }
}

export function generatePropsData(components: Component[]): PropsData {
  const componentMap = new Map<string, Component>();

  components.forEach((component) => {
    if (component.displayName && component.filePath) {
      componentMap.set(component.filePath, component);
    }
  });

  return Array.from(componentMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .reduce((acc: PropsData, [filePath, component]) => {
      const normalizedPath =
        '../ui/' + filePath.replace(/\\/g, '/').split('packages/ui/')[1];

      if (!normalizedPath) {
        console.warn(ERROR_MESSAGES.INVALID_FILE_PATH, filePath);
        return acc;
      }

      acc[normalizedPath] = {
        description: component.description,
        props: component.props,
      };
      return acc;
    }, {});
}
