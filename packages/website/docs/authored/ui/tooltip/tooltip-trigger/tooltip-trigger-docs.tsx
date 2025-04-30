import { Tooltip } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./tooltip-trigger.example.jsx';

export function TooltipTriggerDocs() {
  return (
    <ComponentPage
      preview={
        <Tooltip>
          <Tooltip.Trigger>
            <span>Tooltip trigger</span>
          </Tooltip.Trigger>
        </Tooltip>
      }
      cssPaths={['components/tooltip/tooltip.module.css']}
      componentPath="components/tooltip/tooltip-trigger.tsx"
      exampleCode={exampleCode}
    />
  );
}
