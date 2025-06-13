import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/input.example.tsx';

export function InputDocs() {
  return (
    <ComponentPage
      componentPath="components/input/input.tsx"
      exampleCode={exampleCode}
    />
  );
}
