function NavButtonExample() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <NavButton icon={<Check />} />
      <NavButton icon={<Plus />} shape="circle" />
      <NavButton icon={<User />} noBackground={true} />
    </div>
  );
}
