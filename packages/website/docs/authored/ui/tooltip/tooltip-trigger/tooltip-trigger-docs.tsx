import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/tooltip-trigger.example.tsx';

export function TooltipTriggerDocs() {
  return (
    <ComponentPage
      cssPaths={['components/tooltip/tooltip.module.css']}
      componentPath="components/tooltip/tooltip-trigger.tsx"
      exampleCode={exampleCode}
    />
  );
}
