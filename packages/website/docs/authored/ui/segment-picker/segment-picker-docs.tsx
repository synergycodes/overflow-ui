import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/segment-picker.example.tsx';
import { SEGMENT_PICKER_SIZES } from '@synergycodes/axiom';
import { ComponentProp, toPropMap } from '@site/docs/utils/to-prop-map';

const props: Record<string, ComponentProp> = {
  size: {
    defaultValue: 'medium',
    unionValues: SEGMENT_PICKER_SIZES,
  },
  children: {
    unionValues: ['ReactNode'],
  },
};

export function SegmentPickerDocs() {
  return (
    <ComponentPage
      cssPaths={['components/segment-picker/segment-picker.module.css']}
      componentPath="components/segment-picker/segment-picker.tsx"
      exampleCode={exampleCode}
      hardcodedData={{
        props: toPropMap(props),
      }}
    />
  );
}
