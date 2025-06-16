function LabelButtonExample() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="gray">Gray Button</Button>
        <Button variant="error">Error Button</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button variant="warning">Warning Button</Button>
        <Button variant="success">Success Button</Button>
        <Button variant="ghost-destructive">Ghost Destructive</Button>
        <Button variant="primary" isLoading>
          Loading
        </Button>
      </div>
    </div>
  );
}
