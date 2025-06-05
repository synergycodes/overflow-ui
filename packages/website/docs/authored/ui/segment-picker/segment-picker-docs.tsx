import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/segment-picker.example.tsx';
import {
  SEGMENT_PICKER_SIZES,
  SegmentPicker,
  SegmentPickerOption,
} from '@synergycodes/axiom';
import { useState } from 'react';
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
  const [active, setActive] = useState('one');
  return (
    <ComponentPage
      preview={
        <SegmentPicker onChange={(_, value) => setActive(value)} value={active}>
          <SegmentPickerOption label="one" value="one" />
          <SegmentPickerOption label="two" value="Two" />
        </SegmentPicker>
      }
      cssPaths={['components/segment-picker/segment-picker.module.css']}
      componentPath="components/segment-picker/segment-picker.tsx"
      exampleCode={exampleCode}
      hardcodedData={{
        props: toPropMap(props),
      }}
    />
  );
}
