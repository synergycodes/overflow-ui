export type CSSVariableType =
  | 'color'
  | 'radius'
  | 'size'
  | 'shadow'
  | 'spacing'
  | 'miscellaneous';

type VariableData = { keywords: string[]; label: string };
export const variableTypes = {
  color: { keywords: ['color', 'bg', 'background', 'fill'], label: 'Color' },
  radius: { keywords: ['radius'], label: 'Radius' },
  size: { keywords: ['size', 'width', 'height'], label: 'Size' },
  shadow: { keywords: ['shadow'], label: 'Shadow' },
  spacing: {
    keywords: ['spacing', 'offset', 'gap', 'margin', 'padding', 'pad'],
    label: 'Spacing',
  },
  miscellaneous: {
    keywords: [],
    label: 'Miscellaneous',
  },
} as const satisfies Record<CSSVariableType, VariableData>;

export const PUBLIC_VARIABLE_PREFIX = '--ax-public';
