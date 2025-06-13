function NavIconLabelButtonExample() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <NavButton>
        <Check /> Button
      </NavButton>
      <NavButton>
        Button <Plus />
      </NavButton>
      <NavButton>
        <Plus /> Button <Plus />
      </NavButton>
      <NavButton isSelected>
        <Plus /> Button <Plus />
      </NavButton>
    </div>
  );
}
