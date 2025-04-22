import { ParserOptions } from './types';

export const PARSER_OPTIONS: ParserOptions = {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop) => {
    if (prop.parent) {
      return !prop.parent.fileName.includes('node_modules');
    }
    return true;
  },
} as const;

export const ERROR_MESSAGES = {
  INVALID_COMPONENT: 'Invalid component structure',
  MISSING_DISPLAY_NAME: 'Component is missing displayName',
  INVALID_FILE_PATH: 'Invalid file path',
  PARSING_ERROR: 'Error parsing component',
} as const;
