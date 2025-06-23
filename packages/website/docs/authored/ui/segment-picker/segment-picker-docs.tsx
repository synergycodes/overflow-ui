import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/segment-picker.example.tsx';
import { ComponentProp, toPropMap } from '@site/docs/utils/to-prop-map';
import { SIZES } from '@synergycodes/axiom';

export function SegmentPickerDocs() {
  const props: Record<string, ComponentProp> = {
    size: {
      defaultValue: 'medium',
      unionValues: SIZES,
    },
    shape: {
      defaultValue: '',
      unionValues: ['', 'circle'],
    },
    children: {
      required: true,
      type: 'ReactElement<SegmentPickerItemProps>[]',
    },
    onChange: {
      type: '(event: MouseEventHandler<HTMLButtonElement>, value: string) => void',
    },
    value: {
      unionValues: ['string', 'never'],
      description:
        'The currently selected value (controlled mode). Must not be used in controlled mode.',
    },
    defaultValue: {
      unionValues: ['string', 'never'],
      description:
        'The initial selected value (uncontrolled mode). Must not be used in uncontrolled mode',
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
