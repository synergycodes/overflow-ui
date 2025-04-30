import { readFile } from 'node:fs/promises';

export function sortObjectByKeys<T>(value: T) {
  if (typeof value !== 'object' || value === null) return value;

  if (Array.isArray(value)) {
    return value.map(sortObjectByKeys);
  }

  return Object.keys(value)
    .sort()
    .reduce((result, key) => {
      const nestedValue = value[key];
      result[key] = sortObjectByKeys(nestedValue);

      return result;
    }, {});
}

export async function readJson(path: string) {
  return JSON.parse(await readFile(path, 'utf-8'));
}

export function toPrettyJson(value: unknown) {
  return JSON.stringify(sortObjectByKeys(value), null, 2);
}
