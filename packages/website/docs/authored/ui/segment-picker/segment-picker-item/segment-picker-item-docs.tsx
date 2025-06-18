import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/segment-picker.example.tsx';
import { ComponentProp, toPropMap } from '@site/docs/utils/to-prop-map';

export function SegmentPickerItemDocs() {
  const props: Record<string, ComponentProp> = {
    children: {
      required: true,
      unionValues: [
        'string',
        'ReactElement',
        '[ReactElement, string]',
        '[string, ReactElement]',
        '[ReactElement, string, ReactElement]',
      ],
    },
  };

  return (
    <ComponentPage
      componentPath="components/segment-picker/item/segment-picker-item.tsx"
      exampleCode={exampleCode}
      hardcodedData={{
        props: toPropMap(props),
      }}
    />
  );
}
