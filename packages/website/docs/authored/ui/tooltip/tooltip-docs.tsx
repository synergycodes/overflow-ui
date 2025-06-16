import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/tooltip.example.tsx';

export function TooltipDocs() {
  return (
    <ComponentPage
      cssPaths={['components/tooltip/tooltip.module.css']}
      componentPath="components/tooltip/tooltip.tsx"
      exampleCode={exampleCode}
    />
  );
}
