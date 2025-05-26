function IconLabelButtonExample() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <IconLabelButton variant="primary">
        <Check />
        With Icon Before
      </IconLabelButton>
      <IconLabelButton variant="secondary">
        With Icon After
        <Check />
      </IconLabelButton>
      <IconLabelButton variant="gray">
        <Check />
        With Both Icons
        <Check />
      </IconLabelButton>
      <IconLabelButton variant="success">
        <Plus />
        Add Item
      </IconLabelButton>
      <IconLabelButton variant="warning">
        <User />
        Profile
      </IconLabelButton>
    </div>
  );
}
