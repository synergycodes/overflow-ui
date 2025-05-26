import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  IconLabelButton,
} from '@synergycodes/axiom';
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
    defaultValue: 'medium',
    unionValues: BUTTON_VARIANTS,
  },
  children: {
    unionValues: [
      '[ReactNode, string]',
      '[string, ReactNode]',
      '[ReactNode, string, ReactNode]',
    ],
  },
};

export function IconLabelButtonDocs() {
  return (
    <ComponentPage
      preview={
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <IconLabelButton variant="primary" style={sharedButtonStyle}>
            <Check /> With Icon Before
          </IconLabelButton>
          <IconLabelButton variant="secondary" style={sharedButtonStyle}>
            With Icon After <Check />
          </IconLabelButton>
          <IconLabelButton variant="gray" style={sharedButtonStyle}>
            <Check /> With Both Icons
            <Check />
          </IconLabelButton>
          <IconLabelButton variant="success" style={sharedButtonStyle}>
            <Plus /> Add Item
          </IconLabelButton>
          <IconLabelButton variant="warning" style={sharedButtonStyle}>
            <User />
            Profile
          </IconLabelButton>
        </div>
      }
      cssPaths={[
        'components/button/base-button/base-button.module.css',
        'components/button/styles/border-radius.module.css',
        'components/button/styles/variant.module.css',
        'components/button/styles/icon-size.module.css',
        'components/button/styles/font-size.module.css',
        'components/button/icon-label-button/padding.module.css',
      ]}
      componentPath="components/button/icon-label-button/icon-label-button.tsx"
      exampleCode={exampleCode}
      hardcodedData={{
        props: toPropMap(props),
      }}
    />
  );
}
