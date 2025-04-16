import { Tooltip, TooltipContent, TooltipTrigger } from '@axiom/ui';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./tooltip.example.jsx';

export function TooltipDocs() {
  return (
    <ComponentPage
      preview={
        <Tooltip>
          <TooltipTrigger>
            <span>Tooltip</span>
          </TooltipTrigger>
          <TooltipContent>
            <span>Tooltip</span>
          </TooltipContent>
        </Tooltip>
      }
      cssPaths={["components/tooltip/tooltip.module.css"]}
      componentPath="components/tooltip/tooltip.tsx"
      exampleCode={exampleCode}
    />
  );
}
