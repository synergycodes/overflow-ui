import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/accordion.example.tsx';

export function AccordionDocs() {
  return (
    <ComponentPage
      cssPaths={['components/accordion/accordion.module.css']}
      componentPath="components/accordion/accordion.tsx"
      exampleCode={exampleCode}
    />
  );
}
