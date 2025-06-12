function IconLabelButtonExample() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button variant="primary">
        <Check />
      </Button>
      <Button variant="secondary">
        With Icon After
        <Check />
      </Button>
      <Button variant="gray">
        <Check />
        With Both Icons
        <Check />
      </Button>
      <Button variant="success">
        <Plus />
        Add Item
      </Button>
      <Button variant="warning">
        <User />
        Profile
      </Button>
    </div>
  );
}
