import { User } from '@phosphor-icons/react';
import { NodeDescription, NodeIcon, NodePanel } from '@synergycodes/axiom';
import { Handle, Position } from '@xyflow/react';
import React, { memo } from 'react';

export const NodePanelExample = memo(
  ({
    selected,
    data,
  }: {
    selected: boolean;
    data: { label: string; description: string };
  }) => {
    return (
      <NodePanel.Root selected={selected}>
        <NodePanel.Header>
          <NodeIcon icon={<User />} />
          <NodeDescription label={data.label} description={data.description} />
        </NodePanel.Header>
        <NodePanel.Handles>
          <Handle
            id="target"
            position={Position.Left}
            type="target"
            isConnectable={true}
          />
          <Handle
            id="source"
            position={Position.Right}
            type="source"
            isConnectable={true}
          />
        </NodePanel.Handles>
      </NodePanel.Root>
    );
  },
);
