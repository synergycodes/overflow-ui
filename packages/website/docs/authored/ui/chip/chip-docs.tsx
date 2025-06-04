import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/chip.example.tsx';
import { ChipPreview } from './chip-preview/chip-preview';
import { ComponentProp, toPropMap } from '@site/docs/utils/to-prop-map';
import { CHIP_SIZES } from '@synergycodes/axiom';

const props: Record<string, ComponentProp> = {
  size: {
    defaultValue: 'medium',
    unionValues: CHIP_SIZES,
  },
};

export function ChipDocs() {
  return (
    <ComponentPage
      preview={<ChipPreview />}
      componentPath="components/chip/chip.tsx"
      exampleCode={exampleCode}
      hardcodedData={{
        props: toPropMap(props),
      }}
    />
  );
}
