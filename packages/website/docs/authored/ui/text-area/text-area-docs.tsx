import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/text-area.example.tsx';

export function TextAreaDocs() {
  return (
    <ComponentPage
      cssPaths={['components/text-area/text-area.module.css']}
      componentPath="components/text-area/text-area.tsx"
      exampleCode={exampleCode}
    />
  );
}
