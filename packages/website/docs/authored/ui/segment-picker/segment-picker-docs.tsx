import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/segment-picker.example.tsx';

export function SegmentPickerDocs() {
  return (
    <ComponentPage
      cssPaths={[
        'components/segment-picker/segment-picker.module.css',
        'components/segment-picker/border-radius-size.module.css',
        'components/segment-picker/item/segment-picker-item-shape.module.css',
      ]}
      componentPath="components/segment-picker/segment-picker.tsx"
      exampleCode={exampleCode}
    />
  );
}
