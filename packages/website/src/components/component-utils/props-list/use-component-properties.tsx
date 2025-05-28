import { useMemo } from 'react';
import type { PropDescriptor, PropTypeDescriptor } from 'react-docgen';

export function useComponentProperties(descriptor: PropDescriptor) {
  const { tsType, description, required, defaultValue } = descriptor;

  const propEntries = useMemo(() => {
    const entries = [['Type', formatType(tsType as PropTypeDescriptor)]];

    if (defaultValue?.value) {
      entries.push(['Default', defaultValue?.value as string]);
    }

    return entries;
  }, [tsType, defaultValue]);

  const propTags = useMemo(() => {
    const entries: string[] = [];

    if (required) {
      entries.push('required');
    }

    return entries;
  }, [required]);

  return { propEntries, propTags, description };
}

function formatType(type?: PropTypeDescriptor) {
  if (!type?.name) {
    return 'missing type';
  }

  if (type.name === 'union') {
    return `${type?.raw}`;
  }

  if (type.name.startsWith('intersection[')) {
    return `${type?.raw}`;
  }

  return type?.name;
}
