import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/radio.example.tsx';

export function RadioDocs() {
  return (
    <ComponentPage
      cssPaths={['components/radio-button/radio.module.css']}
      componentPath="components/radio-button/radio.tsx"
      exampleCode={exampleCode}
    />
  );
}
