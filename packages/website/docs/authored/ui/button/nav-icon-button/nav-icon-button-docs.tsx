import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import { NavButton, SIZES } from '@synergycodes/axiom';
import { Check, Plus, User } from '@phosphor-icons/react';
import { ComponentProp, toPropMap } from '@site/docs/utils/to-prop-map';

import exampleCode from '!!raw-loader!@site/docs/code-examples/nav-icon-button.example.tsx';

const props: Record<string, ComponentProp> = {
  shape: {
    defaultValue: '',
    unionValues: ['', 'circle'],
  },
  size: {
    defaultValue: 'medium',
    unionValues: SIZES,
  },
};

export function NavIconButtonDocs() {
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
        'components/button/styles/border-radius.module.css',
        'components/button/styles/icon-size.module.css',
        'components/button/styles/icon-padding.module.css',
        'components/button/nav-button/styles/nav-icon-size.module.css',
        'components/button/nav-button/styles/nav-button-border-radius.module.css',
        'components/button/nav-button/nav-icon-button/nav-icon-padding.module.css',
        'components/button/nav-button/nav-icon-button/nav-icon-button.module.css',
      ]}
      componentPath="components/button/nav-button/nav-icon-button/nav-icon-button.tsx"
      exampleCode={exampleCode}
      hardcodedData={{
        props: toPropMap(props),
      }}
    />
  );
}
