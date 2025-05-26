import { PropDescriptor } from 'react-docgen';
import { PropMap } from '../../src/components/component-utils/props-list/props-list';

export type ComponentProp = {
  required?: boolean;
  defaultValue?: string;
  type?: 'string' | 'boolean' | 'number' | 'ReactNode';
  unionValues?: readonly string[];
};

export function toPropMap(config: Record<string, ComponentProp>): PropMap {
  const result: Record<string, PropDescriptor> = {};

  for (const [key, value] of Object.entries(config)) {
    result[key] = createProp(value);
  }

  return result;
}

function createProp({
  required = false,
  defaultValue,
  type = 'string',
  unionValues,
}: {
  required?: boolean;
  defaultValue?: string;
  type?: string;
  unionValues?: readonly string[];
}) {
  const result: PropDescriptor = { tsType: { name: type } };

  if (unionValues?.length > 0) {
    result.tsType = {
      name: 'union',
      elements: unionValues.map((v) => ({
        name: 'literal',
        value: `'${v}'`,
      })),
      raw: unionValues.map((v) => `'${v}'`).join(' | '),
    };
  }

  if (required) {
    result.required = true;
  }

  if (defaultValue != null) {
    result.defaultValue = {
      computed: false,
      value: `'${defaultValue}'`,
    };
  }

  return result;
}
