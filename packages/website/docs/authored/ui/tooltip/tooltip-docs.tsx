import { Tooltip } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./tooltip.example.jsx';

export function TooltipDocs() {
  return (
    <ComponentPage
      preview={
        <Tooltip>
          <Tooltip.Trigger>
            <span>Tooltip</span>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <span>Tooltip</span>
          </Tooltip.Content>
        </Tooltip>
      }
      cssPaths={['components/tooltip/tooltip.module.css']}
      componentPath="components/tooltip/tooltip.tsx"
      exampleCode={exampleCode}
    />
  );
}
