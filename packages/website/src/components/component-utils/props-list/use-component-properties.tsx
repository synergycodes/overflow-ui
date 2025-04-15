import { useMemo } from 'react';
import { PropDescriptor, PropTypeDescriptor } from 'react-docgen';

export function useComponentProperties(descriptor: PropDescriptor) {
  const { tsType, description, required, defaultValue } = descriptor;

  const propEntries = useMemo(() => {
    const entries = [['Type', formatType(tsType as PropTypeDescriptor)]];

    if (defaultValue?.value) {
      entries.push(['Default', defaultValue?.value as string]);
    }

    return entries;
  }, []);

  const propTags = useMemo(() => {
    const entries = [];

    if (required) {
      entries.push('required');
    }

    return entries;
  }, []);

  return { propEntries, propTags, description };
}

function formatType(type?: PropTypeDescriptor) {
  if (!type) {
    return 'unknown';
  }

  switch (type.name) {
    case 'union': {
      return `${type?.raw}`;
    }

    default: {
      return type.name;
    }
  }
}
