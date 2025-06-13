function NavButtonExample() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <NavButton>Button</NavButton>
      <NavButton isSelected>Button</NavButton>
      <NavButton disabled>Button</NavButton>
    </div>
  );
}
