import React from 'react';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./node.example.jsx';
import { User } from '@phosphor-icons/react';
import { Handle, Position, ReactFlowProvider } from '@xyflow/react';
import {
  Input,
  NodeDescription,
  NodeIcon,
  NodePanel,
} from '@synergycodes/axiom';

export function NodeDocs() {
  return (
    <ComponentPage
      preview={
        <div style={{ display: 'flex', gap: '16px' }}>
          <ReactFlowProvider children={''}>
            <NodePanel.Root selected={true}>
              <NodePanel.Header>
                <NodeIcon icon={<User size={24} />} />
                <NodeDescription
                  label="Node Title"
                  description="This is a description of the node"
                />
              </NodePanel.Header>
              <NodePanel.Content>
                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    flexDirection: 'column',
                  }}
                >
                  <Input />
                  <Input />
                  <Input />
                </div>
              </NodePanel.Content>
              <NodePanel.Handles>
                <Handle id="target" position={Position.Top} type="target" />
                <Handle id="source" position={Position.Bottom} type="source" />
              </NodePanel.Handles>
            </NodePanel.Root>
          </ReactFlowProvider>
        </div>
      }
      cssPaths={['components/node/node-panel/node-panel.module.css']}
      componentPath="components/node/node-panel/node-panel.tsx"
      exampleCode={exampleCode}
    />
  );
}
