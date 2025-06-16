import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/separator.example.tsx';

export function SeparatorDocs() {
  return (
    <ComponentPage
      cssPaths={['components/separator/separator.module.css']}
      componentPath="components/separator/separator.tsx"
      exampleCode={exampleCode}
    />
  );
}
