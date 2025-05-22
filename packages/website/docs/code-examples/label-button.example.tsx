function Example() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <LabelButton label="Primary Button" variant="primary" />
      <LabelButton label="Secondary Button" variant="secondary" />
      <LabelButton label="Gray Button" variant="gray" />
      <LabelButton label="Error Button" variant="error" />
      <LabelButton label="Warning Button" variant="warning" />
      <LabelButton label="Success Button" variant="success" />
      <LabelButton label="Ghost Destructive" variant="ghost-destructive" />
      <LabelButton label="Loading" variant="primary" isLoading />
    </div>
  );
}
