import { Tooltip, TooltipTrigger } from '@axiom/ui';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./tooltip-trigger.example.jsx';

export function TooltipTriggerDocs() {
  return (
    <ComponentPage
      preview={
        <Tooltip>
          <TooltipTrigger>
            <span>Tooltip trigger</span>
          </TooltipTrigger>
        </Tooltip>
      }
      cssPath="components/tooltip/tooltip.module.css"
      componentPath="components/tooltip/tooltip-trigger.tsx"
      exampleCode={exampleCode}
    />
  );
}
