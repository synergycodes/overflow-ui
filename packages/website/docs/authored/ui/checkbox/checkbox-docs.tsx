import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/checkbox.example.tsx';

export function CheckboxDocs() {
  return (
    <ComponentPage
      cssPaths={['components/checkbox/checkbox.module.css']}
      componentPath="components/checkbox/checkbox.tsx"
      exampleCode={exampleCode}
    />
  );
}
