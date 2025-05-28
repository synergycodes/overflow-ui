import { Prism } from 'prism-react-renderer';
import { PUBLIC_VARIABLE_PREFIX } from '../css-variable-list/css-variable-types';

const pattern = new RegExp(PUBLIC_VARIABLE_PREFIX);
const variableNamePattern = /(?<=^--ax-public-)(?:[a-zA-Z0-9_-]+)/;

Prism.languages.css = {
  ...Prism.languages.css,

  //@ts-expect-error bad typing
  variable: {
    ...Prism.languages.css.property,
    inside: {
      'ax-prefix': {
        pattern,
      },
      'variable-name': {
        pattern: variableNamePattern,
      },
    },
  },
};

export { Prism };
