function MenuExample() {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
      <Menu items={[{ label: 'Star Wars' }, { label: 'Star Trek' }]}>
        <LabelButton label="Open" />
      </Menu>
    </div>
  );
}
