export interface Component {
  displayName: string;
  filePath: string;
  description: string;
  props: ComponentProps;
}

export interface ComponentProps {
  [key: string]: {
    name: string;
    required: boolean;
    type: {
      name: string;
      value?: unknown;
    };
    description?: string;
    defaultValue?: {
      value: string;
    };
  };
}

export interface PropsData {
  [key: string]: {
    description: string;
    props: ComponentProps;
  };
}

export interface PropInfo {
  parent?: {
    fileName: string;
  };
}

export interface ParserOptions {
  savePropValueAsString: boolean;
  shouldExtractLiteralValuesFromEnum: boolean;
  shouldRemoveUndefinedFromOptional: boolean;
  propFilter: (prop: PropInfo) => boolean;
}
