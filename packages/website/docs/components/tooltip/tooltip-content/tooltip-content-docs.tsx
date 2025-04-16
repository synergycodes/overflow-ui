import { Tooltip, TooltipContent, TooltipTrigger } from '@axiom/ui';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./tooltip-content.example.jsx';

export function TooltipContentDocs() {
  return (
    <ComponentPage
      preview={
        <Tooltip open={true}>
          <TooltipTrigger>
            <span>Tooltip</span>
          </TooltipTrigger>
          <TooltipContent>
            <span>Tooltip Content Component</span>
          </TooltipContent>
        </Tooltip>
      }
      cssPath="components/tooltip/tooltip.module.css"
      componentPath="components/tooltip/tooltip-content.tsx"
      exampleCode={exampleCode}
    />
  );
}
