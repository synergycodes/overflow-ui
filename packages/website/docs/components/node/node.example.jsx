function Page() {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <ReactFlowProvider>
        <NodePanel.Root selected={true}>
          <NodePanel.Header>
            <NodeIcon icon={<User />} />
            <NodeDescription
              label="Node Title"
              description="This is a description of the node"
            />
          </NodePanel.Header>
          <NodePanel.Content>
            <div
              style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}
            >
              <Input />
              <Input />
              <Input />
            </div>
          </NodePanel.Content>
          <NodePanel.Handles />
        </NodePanel.Root>
      </ReactFlowProvider>
    </div>
  );
}
