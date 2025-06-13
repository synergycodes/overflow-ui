import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import { BUTTON_SIZES, BUTTON_VARIANTS, Button } from '@synergycodes/axiom';
import { Check, Plus, User } from '@phosphor-icons/react';
import { ComponentProp, toPropMap } from '@site/docs/utils/to-prop-map';

import exampleCode from '!!raw-loader!@site/docs/code-examples/icon-label-button.example.tsx';

const sharedButtonStyle = { minWidth: 'max-content', width: '100%' };

const props: Record<string, ComponentProp> = {
  size: {
    defaultValue: 'medium',
    unionValues: BUTTON_SIZES,
  },
  variant: {
    defaultValue: 'primary',
    unionValues: BUTTON_VARIANTS,
  },
  children: {
    unionValues: [
      '[ReactElement, string]',
      '[string, ReactElement]',
      '[ReactElement, string, ReactElement]',
    ],
  },
};

export function IconLabelButtonDocs() {
  return (
    <ComponentPage
      preview={
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="primary" style={sharedButtonStyle}>
            <Check /> With Icon Before
          </Button>
          <Button variant="secondary" style={sharedButtonStyle}>
            With Icon After <Check />
          </Button>
          <Button variant="gray" style={sharedButtonStyle}>
            <Check /> With Both Icons
            <Check />
          </Button>
          <Button variant="success" style={sharedButtonStyle}>
            <Plus /> Add Item
          </Button>
          <Button variant="warning" style={sharedButtonStyle}>
            <User />
            Profile
          </Button>
        </div>
      }
      cssPaths={[
        'components/button/base-button/base-button.module.css',
        'components/button/styles/border-radius.module.css',
        'components/button/styles/variant.module.css',
        'components/button/styles/font-size.module.css',
        'components/button/styles/icon-size.module.css',
        'components/button/styles/icon-label-button-padding.module.css',
        'components/button/styles/gap.module.css',
      ]}
      componentPath="components/button/regular-button/icon-label-button/icon-label-button.tsx"
      exampleCode={exampleCode}
      hardcodedData={{
        props: toPropMap(props),
      }}
    />
  );
}
