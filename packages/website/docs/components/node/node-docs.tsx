import { useState, useCallback, useMemo } from 'react';
import {
  ReactFlowProvider,
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./node.example.jsx';
import { NodePanelExample } from './node-panel-example';
import '@xyflow/react/dist/style.css';

export function NodeDocs() {
  const [nodes, setNodes] = useState([
    {
      id: '1',
      type: 'custom',
      position: { x: 100, y: 100 },
      data: {
        label: 'First Node',
        description: 'This is the first node',
      },
    },
    {
      id: '2',
      type: 'custom',
      position: { x: 450, y: 150 },
      data: {
        label: 'Second Node',
        description: 'This is the second node',
      },
    },
  ]);

  const nodeTypes = useMemo(
    () => ({
      custom: NodePanelExample,
    }),
    [],
  );

  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  return (
    <ComponentPage
      className={'node-docs'}
      preview={
        <div style={{ width: '100%', height: '400px' }}>
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
            />
          </ReactFlowProvider>
        </div>
      }
      componentPath="components/node/node-panel/node-panel.tsx"
      cssPaths={[
        'components/node/node-panel/node-panel.module.css',
        'components/node/node-panel/handle.module.css',
        'components/node/node-as-port-wrapper/node-as-port.css',
        'components/node/node-description/node-description.module.css',
        'components/node/node-icon/node-icon.module.css',
      ]}
      exampleCode={exampleCode}
    />
  );
}
