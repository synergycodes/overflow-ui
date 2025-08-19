import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/edge-label.example.tsx';
import { EDGE_LABEL_SIZES } from '@synergycodes/overflow-ui';
import { ComponentProp, toPropMap } from '@site/docs/utils/to-prop-map';

const props: Record<string, ComponentProp> = {
  size: {
    defaultValue: 'medium',
    unionValues: EDGE_LABEL_SIZES,
  },
};

export function Docs() {
  return (
    <ComponentPage
      cssPaths={[
        'components/edge/edge-label/edge-label-size.module.css',
        'components/edge/edge-label/edge-label.module.css',
      ]}
      componentPath="components/edge/edge-label/edge-label.tsx"
      exampleCode={exampleCode}
      hardcodedData={{
        props: toPropMap(props),
      }}
    />
  );
}
