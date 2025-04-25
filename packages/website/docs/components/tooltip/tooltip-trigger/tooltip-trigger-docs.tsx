import { Tooltip, TooltipTrigger } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./tooltip-trigger.example.tsx';

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
      cssPaths={['components/tooltip/tooltip.module.css']}
      componentPath="components/tooltip/tooltip-trigger.tsx"
      exampleCode={exampleCode}
    />
  );
}
