import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/segment-picker.example.tsx';
import { ComponentProp, toPropMap } from '@site/docs/utils/to-prop-map';
import { SIZES } from '@synergycodes/axiom';

export function SegmentPickerDocs() {
  const props: Record<string, ComponentProp> = {
    shape: {
      defaultValue: '',
      unionValues: ['', 'circle'],
    },
    size: {
      defaultValue: 'medium',
      unionValues: SIZES,
    },
    children: {
      unionValues: ['ReactElement<SegmentPickerItemProps>[]'],
    },
    onChange: {
      unionValues: ['(value: string) => void'],
    },
  };

  return (
    <ComponentPage
      cssPaths={[
        'components/segment-picker/segment-picker.module.css',
        'components/segment-picker/border-radius-size.module.css',
        'components/segment-picker/item/segment-picker-item-shape.module.css',
      ]}
      componentPath="components/segment-picker/segment-picker.tsx"
      exampleCode={exampleCode}
      hardcodedData={{
        props: toPropMap(props),
      }}
    />
  );
}
