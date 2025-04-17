function Page() {
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
  );
}
