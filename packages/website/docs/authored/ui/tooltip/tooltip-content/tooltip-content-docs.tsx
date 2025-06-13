import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/tooltip-content.example.tsx';

export function TooltipContentDocs() {
  return (
    <ComponentPage
      cssPaths={['components/tooltip/tooltip.module.css']}
      componentPath="components/tooltip/tooltip-content.tsx"
      exampleCode={exampleCode}
    />
  );
}
