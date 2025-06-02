const EdgeContext = createContext<{
  hoveredEdgeId: string | null;
  setHoveredEdgeId: (id: string | null) => void;
}>({
  hoveredEdgeId: null,
  setHoveredEdgeId: () => {},
});

function EdgeContextProvider({ children }) {
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);
  return (
    <EdgeContext.Provider value={{ hoveredEdgeId, setHoveredEdgeId }}>
      {children}
    </EdgeContext.Provider>
  );
}

function Node({ selected, id }) {
  return (
    <NodePanel.Root selected={selected}>
      <NodePanel.Header>
        <NodeIcon icon={<User />} />
        <NodeDescription label="Node" description="Node with edge" />
      </NodePanel.Header>
      <NodePanel.Handles>
        <Handle id={`${id}-target`} position={Position.Top} type="target" />
        <Handle id={`${id}-source`} position={Position.Bottom} type="source" />
      </NodePanel.Handles>
    </NodePanel.Root>
  );
}

function CustomEdge({
  selected,
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}) {
  const { hoveredEdgeId } = useContext(EdgeContext);
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const isHovered = hoveredEdgeId === id;

  return (
    <Edge
      id={id}
      path={edgePath}
      selected={selected}
      isHovered={isHovered}
      labelX={labelX}
      labelY={labelY}
    />
  );
}

function Diagram() {
  const [isConnecting, setConnecting] = useState(false);
  const { setHoveredEdgeId } = useContext(EdgeContext);

  const [nodes, setNodes] = useState([
    {
      id: '1',
      type: 'custom',
      position: { x: 0, y: 0 },
    },
    {
      id: '2',
      type: 'custom',
      position: { x: 0, y: 250 },
    },
  ]);

  const [edges, setEdges] = useState([
    {
      id: 'edge',
      source: '1',
      target: '2',
      type: 'custom',
    },
  ]);

  const onNodesChange = useCallback((changes) => {
    setNodes((nodes) => applyNodeChanges(changes, nodes));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((edges) => applyEdgeChanges(changes, edges));
  }, []);

  const onConnect = useCallback((params) => {
    setEdges((edges) => addEdge(params, edges));
  }, []);

  const nodeTypes = useMemo(
    () => ({
      custom: Node,
    }),
    [],
  );

  const edgeTypes = useMemo(
    () => ({
      custom: CustomEdge,
    }),
    [],
  );

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
          onConnectionStart={() => setConnecting(true)}
          onConnectionEnd={() => setConnecting(false)}
          onEdgeMouseEnter={(_, edge) => setHoveredEdgeId(edge.id)}
          onEdgeMouseLeave={() => setHoveredEdgeId(null)}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
        />
      </ReactFlowProvider>
    </div>
  );
}

function Page() {
  return (
    <EdgeContextProvider>
      <Diagram />
    </EdgeContextProvider>
  );
}
