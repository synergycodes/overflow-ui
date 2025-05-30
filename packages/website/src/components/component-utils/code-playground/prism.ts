import { Prism } from 'prism-react-renderer';

const AXIOM_PUBLIC_PREFIX = new RegExp('--ax-public-');

Prism.languages.css = {
  ...Prism.languages.css,

  //@ts-expect-error bad typing
  variable: {
    ...Prism.languages.css.property,
    inside: {
      'ax-prefix': {
        pattern: AXIOM_PUBLIC_PREFIX,
      },
      'variable-name': {
        pattern: /(?<=^--ax-public-)(?:[a-zA-Z0-9_-]+)/,
      },
    },
  },
};

export { Prism };
