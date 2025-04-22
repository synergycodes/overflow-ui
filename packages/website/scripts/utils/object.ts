export function normalizeProps(
  props: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  Object.keys(props)
    .sort()
    .forEach((key) => {
      const value = props[key];
      if (typeof value === 'object' && value !== null) {
        result[key] = normalizeProps(value as Record<string, unknown>);
      } else {
        result[key] = value;
      }
    });
  return result;
}

export function areObjectsEqual(obj1: unknown, obj2: unknown): boolean {
  const normalized1 =
    typeof obj1 === 'object' && obj1 !== null
      ? normalizeProps(obj1 as Record<string, unknown>)
      : obj1;
  const normalized2 =
    typeof obj2 === 'object' && obj2 !== null
      ? normalizeProps(obj2 as Record<string, unknown>)
      : obj2;
  return JSON.stringify(normalized1) === JSON.stringify(normalized2);
}
