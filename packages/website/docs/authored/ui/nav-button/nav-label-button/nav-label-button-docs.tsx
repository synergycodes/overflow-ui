import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import { SIZES } from '@synergycodes/overflow-ui';
import { ComponentProp, toPropMap } from '@site/docs/utils/to-prop-map';

import exampleCode from '!!raw-loader!@site/docs/code-examples/nav-label-button.example.tsx';

const props: Record<string, ComponentProp> = {
  size: {
    defaultValue: 'medium',
    unionValues: SIZES,
  },
};

export function NavButtonDocs() {
  return (
    <ComponentPage
      cssPaths={[
        'components/button/base-button/base-button.module.css',
        'components/button/styles/border-radius.module.css',
        'components/button/styles/label-button-padding.module.css',
        'components/button/nav-button/styles/nav-button.module.css',
        'components/button/nav-button/styles/nav-button-border-radius.module.css',
        'components/button/nav-button/nav-label-button/nav-label-button-padding.module.css',
      ]}
      componentPath="components/button/nav-button/nav-label-button/nav-label-button.tsx"
      exampleCode={exampleCode}
      hardcodedData={{
        props: toPropMap(props),
      }}
    />
  );
}
