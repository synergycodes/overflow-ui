import { NodeDescription, NodePanel } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/node-description.example.tsx';

export function Docs() {
  return (
    <ComponentPage
      preview={
        <NodePanel.Root selected={false}>
          <NodePanel.Header>
            <NodeDescription
              label="Node with a label"
              description="and some description"
            />
          </NodePanel.Header>
        </NodePanel.Root>
      }
      cssPaths={[
        'components/node/node-description/node-description.module.css',
      ]}
      componentPath="components/node/node-description/node-description.tsx"
      exampleCode={exampleCode}
    />
  );
}
