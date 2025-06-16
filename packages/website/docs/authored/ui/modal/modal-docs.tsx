import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/modal.example.tsx';

export function ModalDocs() {
  return (
    <ComponentPage
      cssPaths={['components/modal/modal.module.css']}
      componentPath="components/modal/modal.tsx"
      exampleCode={exampleCode}
    />
  );
}
