import { User } from '@phosphor-icons/react';
import { NodeIcon, NodePanel } from '@synergycodes/axiom';

export function Example() {
  return (
    <NodePanel.Root selected={false}>
      <NodePanel.Header>
        <NodeIcon icon={<User />} />
        Node with Icon
      </NodePanel.Header>
    </NodePanel.Root>
  );
}
