function IconButtonExample() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button variant="primary">
        <Check />
      </Button>
      <Button variant="secondary">
        <Plus />
      </Button>
      <Button variant="gray">
        <User />
      </Button>
    </div>
  );
}
