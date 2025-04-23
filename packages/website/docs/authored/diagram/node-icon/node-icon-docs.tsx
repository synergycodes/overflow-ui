import { NodeIcon, NodePanel } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./node-icon.example.jsx';
import { User } from '@phosphor-icons/react';

export function Docs() {
  return (
    <ComponentPage
      preview={
        <NodePanel.Root selected={false}>
          <NodePanel.Header>
            <NodeIcon icon={<User />} />
            Node with Icon
          </NodePanel.Header>
        </NodePanel.Root>
      }
      cssPaths={['components/node/node-icon/node-icon.module.css']}
      componentPath="components/node/node-icon/node-icon.tsx"
      exampleCode={exampleCode}
    />
  );
}
