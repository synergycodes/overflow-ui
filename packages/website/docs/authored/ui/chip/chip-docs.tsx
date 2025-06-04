import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/chip.example.tsx';
import { ChipPreview } from './chip-preview/chip-preview';

export function ChipDocs() {
  return (
    <ComponentPage
      preview={<ChipPreview />}
      componentPath="components/chip/chip.tsx"
      exampleCode={exampleCode}
    />
  );
}
