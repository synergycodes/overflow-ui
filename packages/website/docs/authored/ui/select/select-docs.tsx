import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/select.example.tsx';

export function SelectDocs() {
  return (
    <ComponentPage
      cssPaths={['components/select/select-button/select-button.module.css']}
      componentPath="components/select/select.tsx"
      exampleCode={exampleCode}
    />
  );
}
