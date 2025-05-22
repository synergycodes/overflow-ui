import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  LabelButton,
} from '@synergycodes/axiom';
import { ComponentProp, toPropMap } from '@site/tools/utils/to-prop-map';

import exampleCode from '!!raw-loader!@site/docs/code-examples/label-button.example.tsx';

const sharedButtonStyle = { minWidth: 'max-content', width: '100%' };

const buttons = [
  { label: 'Primary Button', variant: 'primary' },
  { label: 'Secondary Button', variant: 'secondary' },
  { label: 'Gray Button', variant: 'gray' },
  { label: 'Error Button', variant: 'error' },
  { label: 'Warning Button', variant: 'warning' },
  { label: 'Success Button', variant: 'success' },
  { label: 'Ghost Destructive', variant: 'ghost-destructive' },
  { label: 'Loading', variant: 'primary', isLoading: true },
] as const;

const props: Record<string, ComponentProp> = {
  label: { required: true },
  isLoading: { type: 'boolean' },
  size: {
    defaultValue: 'medium',
    unionValues: BUTTON_SIZES,
  },
  variant: {
    defaultValue: 'medium',
    unionValues: BUTTON_VARIANTS,
  },
};

export function LabelButtonDocs() {
  return (
    <ComponentPage
      preview={
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {buttons.map((props, index) => (
            <LabelButton key={index} {...props} style={sharedButtonStyle} />
          ))}
        </div>
      }
      cssPaths={[
        'components/button/base-button/base-button.module.css',
        'components/button/label-button/loader.module.css',
        'components/button/label-button/padding.module.css',
        'components/button/styles/font-size.module.css',
        'components/button/styles/border-radius.module.css',
        'components/button/styles/variant.module.css',
      ]}
      componentPath="components/button/label-button/label-button.tsx"
      exampleCode={exampleCode}
      hardcodedData={{
        props: toPropMap(props),
      }}
    />
  );
}
