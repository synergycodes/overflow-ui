import { SegmentPicker } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/segment-picker.example.tsx';
import { useState } from 'react';

export function SegmentPickerDocs() {
  const [value, setValue] = useState('on');

  return (
    <ComponentPage
      preview={
        <SegmentPicker
          value={value}
          onChange={setValue}
          items={['on', 'off']}
        />
      }
      cssPaths={['components/segment-picker/segment-picker.module.css']}
      componentPath="components/segment-picker/segment-picker.tsx"
      exampleCode={exampleCode}
    />
  );
}
