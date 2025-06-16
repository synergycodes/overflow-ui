function MenuExample() {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
      <Menu items={[{ label: 'Star Wars' }, { label: 'Star Trek' }]}>
        <Button>Open</Button>
      </Menu>
    </div>
  );
}
