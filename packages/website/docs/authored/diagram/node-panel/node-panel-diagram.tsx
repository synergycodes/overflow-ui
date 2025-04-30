import {
  type Node as NodeType,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import { NodePanel } from '@synergycodes/axiom';
import { useCallback, useMemo, useState } from 'react';

export function Example() {
  const [isConnecting, setConnecting] = useState(false);

  const Node = useCallback(({ selected }) => {
    return (
      <NodePanel.Root selected={selected}>
        <NodePanel.Header>
          <p>User Node</p>
        </NodePanel.Header>
        <NodePanel.Content>
          <p>Content</p>
        </NodePanel.Content>
      </NodePanel.Root>
    );
  }, []);

  const [nodes, setNodes] = useState<NodeType[]>([
    {
      id: '1',
      type: 'custom',
      position: { x: 100, y: 150 },
      data: {},
    },
    {
      id: '2',
      type: 'custom',
      position: { x: 450, y: 150 },
      data: {},
    },
  ]);

  const nodeTypes = useMemo(
    () => ({
      custom: Node,
    }),
    [Node],
  );

  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback((changes) => {
    setNodes((nodes) => applyNodeChanges(changes, nodes));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((edges) => applyEdgeChanges(changes, edges));
  }, []);

  const onConnect = useCallback((params) => {
    setEdges((edges) => addEdge(params, edges));
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
      }}
    >
      <ReactFlowProvider>
        <ReactFlow
          fitView
          fitViewOptions={{
            padding: 0.2,
          }}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={() => setConnecting(true)}
          onConnectEnd={() => setConnecting(false)}
          nodeTypes={nodeTypes}
        />
      </ReactFlowProvider>
    </div>
  );
}
