import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import { BUTTON_SIZES, BUTTON_VARIANTS } from '@synergycodes/overflow-ui';
import { ComponentProp, toPropMap } from '@site/docs/utils/to-prop-map';

import exampleCode from '!!raw-loader!@site/docs/code-examples/icon-label-button.example.tsx';

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
