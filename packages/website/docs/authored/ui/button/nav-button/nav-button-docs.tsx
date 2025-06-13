import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import { NavButton, SIZES } from '@synergycodes/axiom';
import { Check, Plus, User } from '@phosphor-icons/react';
import { ComponentProp, toPropMap } from '@site/docs/utils/to-prop-map';

import exampleCode from '!!raw-loader!@site/docs/code-examples/nav-button.example.tsx';

const props: Record<string, ComponentProp> = {
  icon: { type: 'ReactNode' },
  noBackground: { type: 'boolean' },
  shape: {
    defaultValue: '',
    unionValues: ['', 'circle'],
  },
  size: {
    defaultValue: 'medium',
    unionValues: SIZES,
  },
};

export function NavButtonDocs() {
  return (
    <ComponentPage
      preview={
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <NavButton>
            <Check />
          </NavButton>
          <NavButton shape="circle">
            <Plus />
          </NavButton>
          <NavButton iconOnly={true}>
            <User />
          </NavButton>
        </div>
      }
      cssPaths={[
        'components/button/base-button/base-button.module.css',
        'components/button/styles/icon-size.module.css',
        'components/button/styles/border-radius.module.css',
        'components/button/styles/icon-padding.module.css',
      ]}
      componentPath="components/button/nav-button/nav-button.tsx"
      exampleCode={exampleCode}
      hardcodedData={{
        props: toPropMap(props),
      }}
    />
  );
}
