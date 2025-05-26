import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import { BUTTON_SIZES, BUTTON_VARIANTS, IconButton } from '@synergycodes/axiom';
import { Check, Plus, User } from '@phosphor-icons/react';
import { ComponentProp, toPropMap } from '@site/docs/utils/to-prop-map';

import exampleCode from '!!raw-loader!@site/docs/code-examples/icon-button.example.tsx';

const props: Record<string, ComponentProp> = {
  shape: {
    defaultValue: '',
    unionValues: ['', 'circle'],
  },
  size: {
    defaultValue: 'medium',
    unionValues: BUTTON_SIZES,
  },
  variant: {
    defaultValue: 'medium',
    unionValues: BUTTON_VARIANTS,
  },
};

export function IconButtonDocs() {
  return (
    <ComponentPage
      preview={
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <IconButton icon={<Check />} variant="primary" />
          <IconButton icon={<Plus />} variant="secondary" />
          <IconButton icon={<User />} variant="gray" />
        </div>
      }
      cssPaths={[
        'components/button/base-button/base-button.module.css',
        'components/button/styles/border-radius.module.css',
        'components/button/styles/variant.module.css',
        'components/button/styles/icon-size.module.css',
        'components/button/styles/icon-padding.module.css',
      ]}
      componentPath="components/button/icon-button/icon-button.tsx"
      exampleCode={exampleCode}
      hardcodedData={{
        props: toPropMap(props),
      }}
    />
  );
}
