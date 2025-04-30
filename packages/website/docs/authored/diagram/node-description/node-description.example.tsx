import { NodeDescription, NodePanel } from '@synergycodes/axiom';

export function Example() {
  return (
    <NodePanel.Root selected={false}>
      <NodePanel.Header>
        <NodeDescription label="Node" description="and some description" />
      </NodePanel.Header>
    </NodePanel.Root>
  );
}
