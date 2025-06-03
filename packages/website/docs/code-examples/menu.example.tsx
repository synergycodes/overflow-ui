function MenuExample() {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
      <Menu items={[{ label: 'Star Wars' }, { label: 'Star Trek' }]}>
        <LabelButton label="Open" />
      </Menu>
      <div style={{ position: 'relative' }}>
        <Menu
          open={true}
          items={[{ label: 'Yoda' }, { label: 'Spock' }]}
        ></Menu>
      </div>
    </div>
  );
}
