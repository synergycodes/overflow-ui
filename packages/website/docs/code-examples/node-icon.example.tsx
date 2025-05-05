function NodeIconExample() {
  return (
    <NodePanel.Root selected={false}>
      <NodePanel.Header>
        <NodeIcon icon={<User />} />
        Node with Icon
      </NodePanel.Header>
    </NodePanel.Root>
  );
}
