import { Tooltip } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./tooltip-content.example.tsx';

export function TooltipContentDocs() {
  return (
    <ComponentPage
      preview={
        <Tooltip open={true}>
          <Tooltip.Trigger>
            <span>Tooltip</span>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <span>Tooltip Content Component</span>
          </Tooltip.Content>
        </Tooltip>
      }
      cssPaths={['components/tooltip/tooltip.module.css']}
      componentPath="components/tooltip/tooltip-content.tsx"
      exampleCode={exampleCode}
    />
  );
}
