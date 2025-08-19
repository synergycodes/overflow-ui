import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import { BUTTON_SIZES, BUTTON_VARIANTS } from '@synergycodes/overflow-ui';
import { ComponentProp, toPropMap } from '@site/docs/utils/to-prop-map';

import exampleCode from '!!raw-loader!@site/docs/code-examples/label-button.example.tsx';

const props: Record<string, ComponentProp> = {
  isLoading: { type: 'boolean' },
  size: {
    defaultValue: 'medium',
    unionValues: BUTTON_SIZES,
  },
  variant: {
    defaultValue: 'primary',
    unionValues: BUTTON_VARIANTS,
  },
};

export function LabelButtonDocs() {
  return (
    <ComponentPage
      cssPaths={[
        'components/button/base-button/base-button.module.css',
        'components/button/styles/font-size.module.css',
        'components/button/styles/label-button-padding.module.css',
        'components/button/styles/border-radius.module.css',
        'components/button/styles/variant.module.css',
      ]}
      componentPath="components/button/regular-button/label-button/label-button.tsx"
      exampleCode={exampleCode}
      hardcodedData={{
        props: toPropMap(props),
      }}
    />
  );
}
